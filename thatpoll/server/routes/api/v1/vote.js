const express = require('express');
const router = express.Router();

const Poll = require('../../../models/Poll');
const Vote = require('../../../models/Vote');

router.post('/poll/vote/:slug', async (req, res) => {
  try {
    // const ip = req.clientIp;
    const poll = await Poll.findOne({ url: req.params.slug });
    if(poll !== null) {
      if(poll.active) {
        if (req.body.selectedVote > poll.results.length - 1) {
          return res.status(200).json({ message: 'error' }).end();
        }
        let vote = await Vote.exists({ url: req.params.slug, ip: req.clientIp });
        //console.log(vote)
        if(vote) {
          return res.status(200).json({ message: 'error' }).end();
          // user already voted
        } else {
          // add vote doc
          vote = await new Vote({
            url: req.params.slug,
            ip: req.clientIp,
            vote: req.body.selectedVote
          });
          
          await vote.save();
          // increment number in array at position selected
          // increment totalvotes
          const pollResult = await Poll.findByIdAndUpdate(poll.id,
            { $inc: {
              [`results.${req.body.selectedVote}`]: 1,
              totalVotes: 1
            } }, {new: true}
          );
            
          const resultsData = {
            totalVotes: pollResult.totalVotes,
            results: pollResult.results,
            userDidVote: true,
            selectedVote: vote.selectedVote
          }

          const io = req.app.get('socketio');
          io.sockets.in(req.params.slug).emit("updateResults", req.body.selectedVote);
          
          return res.status(200).json({ message: 'success' }).end();
        }             
      } else {
        return res.status(200).json({ message: 'error' }).end();
      }
    } else {
      return res.status(404).json({ message: 'not found'}).end();
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'internal server error'}).end();
  }
  
});

module.exports = router;