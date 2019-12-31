const express = require('express');
const router = express.Router();

const setClientId = require('../../../middleware/setClientId');

// const RateLimit = require('express-rate-limit');
// const MongoStore = require('rate-limit-mongo');
// const config = require('../../../server.config');

// const limiter = new RateLimit({
//   store: new MongoStore({
//     uri: config.db.uri,
//     user: config.db.user,
//     password: config.db.password
//   }),
//   max: 100,
//   windowMs: 15 * 60 * 1000
// });

const Poll = require('../../../models/Poll');
const Vote = require('../../../models/Vote');

router.post('/poll/results/:slug', setClientId, async (req, res) => {
  try {
    let poll = await Poll.findOne({ url: req.params.slug });

    if (poll === null) {
      res.status(404).json({ message: 'not found'});
    }

    let vote;

    if (poll.multiIp) {
      vote = await Vote.exists({ url: req.params.slug, cid: req.cid });
    } else {
      vote = await Vote.exists({ url: req.params.slug, ip: req.clientIp });
    }

    const resultsData = {
      userDidVote: false,
      totalVotes: poll.totalVotes,
      results: poll.results
    }
    
    if (vote) {
      resultsData.userDidVote = true;
    }
    
    res.status(200).json(resultsData);
    // if(poll) {
    //   const vote = await Vote.exists({ url: req.params.slug, ip: req.clientIp });
    //   poll = await Poll.findOne({ url: req.params.slug });

    //   const resultsData = {
    //     userDidVote: false,
    //     totalVotes: poll.totalVotes,
    //     results: poll.results
    //   }

    //   if(vote) {
    //     // user did voted
    //     resultsData.userDidVote = true;
    //   }
    
    //   res.status(200).json(resultsData);
    // } else {
    //   res.status(404).json({ message: 'not found'});
    // }
  } catch (err) {
    console.log(err)
  }
});


module.exports = router;