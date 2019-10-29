const express = require('express');
const router = express.Router();

const getUser = require('../middleware/user');

const Poll = require('../models/Poll');
const Vote = require('../models/Vote');
const ipaddr = require('ipaddr.js');

router.post('/poll/vote/:slug', async (req, res) => {
  try {
    //console.log(ipaddr.process(req.clientIp).kind());
    //const ip = ipaddr.process(req.clientIp).octets.join('.');
    const ip = req.clientIp;
    let poll = await Poll.exists({ url: req.params.slug });
    if(poll) {
      // add 1 to totalvotes
      let vote = await Vote.exists({ url: req.params.slug, ip: ip });
      console.log(vote)
      if(vote) {
        // user already voted
      } else {
        // add vote doc
        vote = await new Vote({
          url: req.params.slug,
          ip: ip,
          vote: req.body.selectedVote
        });

        await vote.save();
        // increment number in array at position selected
        // increment totalvotes
        await Poll.findOneAndUpdate({ url: req.params.slug },
          { $inc: {
             [`results.${req.body.selectedVote}`]: 1,
             totalVotes: 1
            }
          }
        );
      }
      /*
      const pollData = {
        title: poll.title,
        desc: poll.desc,
        visibility: poll.visibility,
        choices: poll.choices,
        votingPeriod: poll.votingPeriod,
        dateCreated: poll.dateCreated,
        visits: 0
      }
      */
      res.status(200).json({message: 'success'});
    } else {
      res.status(404).json({ message: 'not found'});
    }
  } catch (err) {
    console.log(err)
  }
  
});


module.exports = router;