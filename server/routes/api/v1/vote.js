const express = require('express');
const router = express.Router();

const setClientId = require('../../../middleware/setClientId');

const Poll = require('../../../models/Poll');
const Vote = require('../../../models/Vote');

router.post('/poll/vote/:slug', setClientId, async (req, res) => {
  try {
    const poll = await Poll.findOne({ url: req.params.slug });
    if (poll === null) {
      return res.status(404).json({ message: 'not found'}).end();
    }
    
    if (!poll.active) {
      return res.status(400).json({ message: 'error' }).end();
    }

    let vote;

    if (poll.multiIp) {
      //check cookie only
      vote = await Vote.exists({ url: req.params.slug, cid: req.cid });
    } else {
      // check ip
      vote = await Vote.exists({ url: req.params.slug, ip: req.clientIp });
    }

    if (vote) {
      // user already voted
      return res.status(400).json({ message: 'didVote' }).end();
    }

    const selectedChoices = req.body.selectedChoices;

    if (!Array.isArray(selectedChoices)) {
      return res.status(400).json({ message: 'error' }).end();
    }

    let findDuplicates = selectedChoices.filter((item, index) => selectedChoices.indexOf(item) != index);
    if (findDuplicates.length > 0) {
      return res.status(400).json({ message: 'error' }).end();
    }

    // if selected choice position is greater than largest possible choice or lower than 0
    // [1, 4]
    // Only valid choices are 0, 1
    // minus 1 because array starts at 0
    // 1 > (2 - 1)  => false
    // 4 > (2 - 1) => true => send error
    for (let i = 0; i < selectedChoices.length; i++) {
      selectedChoices[i] = parseInt(selectedChoices[i]);
      if (selectedChoices[i] > poll.choices.length - 1 || selectedChoices[i] < 0) {
        return res.status(400).json({ message: 'error' }).end();
      }
    }
    // check maximum allowed choices selected
    if (selectedChoices.length > poll.maxSelectChoices) {
      return res.status(400).json({ message: 'error' }).end();
    }

    // add vote doc
    vote = await new Vote({
      url: req.params.slug,
      ip: req.clientIp,
      cid: req.cid,
      vote: selectedChoices
    });
    
    await vote.save();

    const resultsQueryObj = { totalVotes: 1 };
    if (poll.multiChoice) {
      selectedChoices.forEach(selectedVote => {
        resultsQueryObj[`results.${selectedVote}`] = 1;
      });
    } else {
      resultsQueryObj[`results.${selectedChoices[0]}`] = 1;
    }

    // if (selectedChoices > poll.results.length - 1) {
    //   return res.status(400).json({ message: 'error' }).end();
    // }


    // increment number in array at position selected
    // increment totalvotes
    // const pollResult = await Poll.findByIdAndUpdate(poll.id,
    //   { $inc: {
    //     [`results.${selectedChoices}`]: 1,
    //     totalVotes: 1
    //   } }, {new: true}
    // );
    const pollResult = await Poll.findByIdAndUpdate(poll.id,
      { $inc: resultsQueryObj }, {new: true}
    );

    const resultsData = {
      totalVotes: pollResult.totalVotes,
      results: pollResult.results,
      userDidVote: true,
      selectedChoices: vote.selectedChoices
    }

    const io = req.app.get('socketio');
    io.sockets.in(req.params.slug).emit('updateResults', selectedChoices);
    // io.sockets.in(req.params.slug).emit("updateResults", selectedChoices);
    
    return res.status(200).json({ message: 'success' }).end();

  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'internal server error'}).end();
  }
  
});

module.exports = router;