const express = require('express');
const router = express.Router();

const Poll = require('../models/Poll');
const Vote = require('../models/Vote');
const Visits = require('../models/Visits');

const ipaddr = require('ipaddr.js');


router.get('/poll/:slug', async (req, res) => {
  try {
    //console.log(ipaddr.process(req.clientIp).kind());
    const ip = req.clientIp;
    //const ip = ipaddr.process(req.clientIp).octets.join('.');
    const poll = await Poll.findOne({ url: req.params.slug });
    if(poll !== null) {
      const userDidVote = await Vote.exists({ url: req.params.slug, ip: ip });
      console.log(req.params.slug);
      console.log(ip);
      console.log(userDidVote);
      const userData = { 
        didVote: userDidVote,
        vote: null
      };
      if(userDidVote) {
        const userVote = await Vote.findOne({ url: req.params.slug, ip: ip });
        userData.vote = userVote.vote;
      }
      const pollData = {
        title: poll.title,
        desc: poll.desc,
        visibility: poll.visibility,
        choices: poll.choices,
        votingPeriod: poll.votingPeriod,
        dateCreated: poll.dateCreated,
        totalVotes: poll.totalVotes,
        visits: 0,
      }


      res.status(200).json({pollData, userData});
    } else {
      res.status(404).json({ message: 'not found'});
    }
  } catch (err) {
    console.log(err)
  }
  
});

router.get('/poll/results/:slug', async (req, res) => {
  try {
    
  } catch (err) {
    
  }
});

async function getVisits(req, res, next) {
  try {
    // if poll exists -> if visit exists -> create new visit doc?
    const poll = await Poll.exists({ url: req.params.slug });
    if(poll) {
      const visit = await Visits.exists({ url: req.params.slug, ip: req.clientIp });
      if(visit) {
        next();
      } else {
        const newVisit = await Visits({ url: req.params.slug, ip: req.clientIp });
        newVisit = await newVisit.save();
        next();
      }
    }
  } catch(err) {
    
  }
  /*
  try {
    // if poll exists, create new visit document
    const poll = await Poll.findOne({ url: req.params.slug });
    // if poll exists
    if(poll !== null) {
      // find one doc with userip and url
      const viewerIp = await Visits.findOne({
        url: poll.url,
        ip: userIp
      });
      console.log(viewerIp);
      // if no doc, create new doc
      if(viewerIp == null) {
        let newVisit = await new Visits({
          url: poll.url,
          ip: userIp
        });
        newVisit = await newVisit.save();
      }

    }

  } catch(err) {

  }
  */
}


module.exports = router;