const express = require('express');
const router = express.Router();

const Poll = require('../models/Poll');
const Vote = require('../models/Vote');

const moment = require('moment');

//const ipaddr = require('ipaddr.js');


router.get('/poll/choices/:slug', async (req, res) => {
  try {
    const poll = await Poll.findOne({ url: req.params.slug });
    if(poll !== null) {
      const userDidVote = await Vote.exists({ url: req.params.slug, ip: req.clientIp });
      const userData = { 
        didVote: userDidVote,
        vote: null
      };
      if(userDidVote) {
        const userVote = await Vote.findOne({ url: req.params.slug, ip: req.clientIp });
        userData.vote = userVote.vote;
      }
      const pollData = {
        choices: poll.choices,
        votingPeriod: poll.votingPeriod,
        dateCreated: poll.dateCreated,
        totalVotes: poll.totalVotes,
        timelimit: Math.round(moment.duration(moment(poll.dateCreated).add(poll.votingPeriod, 'hours').diff(Date.now())).asHours())
      }
      
      res.status(200).json({pollData, userData});
    } else {
      res.status(404).json({ message: 'not found'});
    }
  } catch (err) {
    console.log(err)
  }
  
});

module.exports = router;