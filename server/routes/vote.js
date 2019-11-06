const express = require('express');
const router = express.Router();

const getUser = require('../middleware/user');

const Poll = require('../models/Poll');
const Vote = require('../models/Vote');
//const ipaddr = require('ipaddr.js');

router.post('/poll/vote/:slug', async (req, res) => {
  try {
    //console.log(ipaddr.process(req.clientIp).kind());
    //const ip = ipaddr.process(req.clientIp).octets.join('.');
    const ip = req.clientIp;
    const poll = await Poll.findOne({ url: req.params.slug });
    // let poll = await Poll.exists({ url: req.params.slug });
    if(poll !== null) {
      if(poll.active) {
        let vote = await Vote.exists({ url: req.params.slug, ip: ip });
        console.log(vote)
        if(vote) {
          return res.status(200).json({ message: 'error' }).end();
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
          const pollResult = await Poll.findOneAndUpdate({ url: req.params.slug },
            { $inc: {
               [`results.${req.body.selectedVote}`]: 1,
               totalVotes: 1
              }
            }, {new: true}
          );
  
          const resultsData = {
            totalVotes: pollResult.totalVotes,
            results: pollResult.results,
            userDidVote: true,
            selectedVote: vote.selectedVote
          }
          res.status(200).json({
            message: 'success',
            resultsData
          });
        }             
      } else {
        return res.status(200).json({ message: 'error' }).end();
      }
    } else {
      res.status(404).json({ message: 'not found'});
    }
  } catch (err) {
    console.log(err)
  }
  
});

module.exports = router;