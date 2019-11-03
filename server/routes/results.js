const express = require('express');
const router = express.Router();

const Poll = require('../models/Poll');
const Vote = require('../models/Vote');

router.get('/poll/results/:slug', async (req, res) => {
  try {
    const ip = req.clientIp;
    let poll = await Poll.exists({ url: req.params.slug });
    if(poll) {
      const vote = await Vote.exists({ url: req.params.slug, ip: ip });
      poll = await Poll.findOne({ url: req.params.slug });

      const resultsData = {
        userDidVote: false,
        totalVotes: poll.totalVotes,
        results: poll.results
      }

      if(vote) {
        // user did voted
        resultsData.userDidVote = true;
      }
    
      res.status(200).json(resultsData);
    } else {
      res.status(404).json({ message: 'not found'});
    }
  } catch (err) {
    console.log(err)
  }
});


module.exports = router;