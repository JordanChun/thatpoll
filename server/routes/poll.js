const express = require('express');
const router = express.Router();

const Poll = require('../models/Poll');
const Vote = require('../models/Vote');
const Visits = require('../models/Visits');

const moment = require('moment');
require('moment-precise-range-plugin');

//const ipaddr = require('ipaddr.js');

router.get('/poll/:slug', async (req, res) => {
  try {
    //console.log(ipaddr.process(req.clientIp).kind());
    //const ip = ipaddr.process(req.clientIp).octets.join('.');
    //console.log(ip)
    const ip = await req.clientIp;
    let poll = await Poll.findOne({ url: req.params.slug });
    if(poll !== null) {
      console.log("client ip: " + ip);
      const userDidVote = await Vote.exists({ url: req.params.slug, ip: ip });
      /*
      if(vote) {
        // user did voted
        resultsData.userDidVote = true;
      }
      */
      const userData = { 
        didVote: userDidVote
      };

      // if poll is active calculate timelimit
      let timelimit = '';
      if(poll.active) {
        const endTime = moment(poll.dateCreated,'YYYY-MM-DD HH:mm:ss').add(poll.votingPeriod, 'hours');
        const currentTime = moment(new Date(),'YYYY-MM-DD HH:mm:ss');
        if(endTime > currentTime) {
          timelimit = 'Voting ends in:';
          const diff = moment.preciseDiff(endTime, currentTime, true);
          const days = diff.days;
          const hours = diff.hours;
          const minutes = diff.minutes;
          if(days > 0) timelimit += ` ${days} days`;
          if(hours > 0) timelimit += ` ${hours} hours`;
          if(minutes > 0) timelimit += ` ${minutes} minutes`;
        } else {
          timelimit = 'Voting has ended'
          poll = await Poll.findOneAndUpdate({ url: req.params.slug }, { active: false }, {new: true});
        }
      } else {
        timelimit = 'Voting has ended'
      }

      const pollData = {
        title: poll.title,
        desc: poll.desc,
        visibility: poll.visibility,
        choices: poll.choices,
        votingPeriod: poll.votingPeriod,
        dateCreated: moment(poll.dateCreated).format('ll'),
        totalVotes: poll.totalVotes,
        timelimit: timelimit,
        active: poll.active,
        results: poll.results,
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