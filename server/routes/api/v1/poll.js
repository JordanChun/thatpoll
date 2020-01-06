const express = require('express');
const router = express.Router();

const setClientId = require('../../../middleware/setClientId');
const cookieParser = require('cookie-parser')

const Poll = require('../../../models/Poll');
const Vote = require('../../../models/Vote');
const Visit = require('../../../models/Visit');

const moment = require('moment');
require('moment-precise-range-plugin');

router.post('/poll/:slug', setClientId, async (req, res) => {
  let clientIp = req.clientIp;
  let cid = req.cid;

  // let ipAddr = req.headers["x-forwarded-for"];
  // console.log(`x-forwarded-for: ${ipAddr}`);
  // if (ipAddr){
  //   let list = ipAddr.split(",");
  //   ipAddr = list[list.length-1];
  // } else {
  //   ipAddr = req.connection.remoteAddress;
  // }

  // console.log(ipAddr);

  if (req.headers['x-ip'] !== 'undefined') {
    clientIp = req.headers['x-ip'];
  }

  if (req.headers['x-cid'] !== 'undefined') {
    cid = cookieParser.signedCookie(req.headers['x-cid'], 's21Jc-2zXsQ');
  }

  try {
    let poll = await Poll.findOne({ url: req.params.slug });
    
    if (poll === null) {
      return res.status(404).json({ message: 'not found'});
    }
    
    // add 1 view
    
    const visit = await Visit.findOne({ url: req.params.slug, ip: clientIp });
    
    if (visit === null) {
      let newVisit = await new Visit({
        url: req.params.slug,
        ip: clientIp,
        lastVisited: new Date()
      });
      await newVisit.save();
      
      poll = await Poll.findOneAndUpdate({ url: req.params.slug },
        { $inc: {
          visits: 1
        }
      }, {new: true}
      );
      
    } else {
      const lastVisted = moment(visit.lastVisited)
      const minutes = moment.duration(moment(new Date()).diff(lastVisted)).asMinutes();
      // if last visit was more than 5 mins add visit count and update last visited
      if (minutes > 5) {
        visit.lastVisited = new Date();
        await visit.save();
        
        poll = await Poll.findOneAndUpdate({ url: req.params.slug },
          { $inc: {
            visits: 1
          }
        }, {new: true}
        );
      }
    } 
    
    // if poll is active calculate timelimit
    let timelimit = '';
    if(poll.active) {
      const endTime = moment(poll.dateCreated,'YYYY-MM-DD HH:mm:ss').add(poll.votingPeriod, 'hours');
      const currentTime = moment(new Date(),'YYYY-MM-DD HH:mm:ss');
      if(endTime > currentTime) {
        const diff = moment.preciseDiff(endTime, currentTime, true);
        const days = diff.days;
        const hours = diff.hours;
        const minutes = diff.minutes;
        if (days > 0) timelimit += ` ${days} days`;
        if (hours > 0) timelimit += ` ${hours} hours`;
        if (minutes > 0) timelimit += ` ${minutes} minutes`;
        if (timelimit === '') timelimit += ' less than 1 minute';
      } else {
        timelimit = 'Voting Ended'
        poll = await Poll.findOneAndUpdate({ url: req.params.slug }, { active: false }, {new: true});
      }
    } else {
      timelimit = 'Voting Ended'
    }
    
    let userDidVote;

    if (poll.multiIp) {
      userDidVote = await Vote.exists({ url: req.params.slug, cid: cid });
    } else {
      userDidVote = await Vote.exists({ url: req.params.slug, ip: clientIp });
    }

    const userData = { 
      didVote: userDidVote,
    };

    const choices = [];
    poll.entries.forEach(entry => {
      choices.push(entry.choice)
    });

    const sortedEntries = poll.entries;
    sortedEntries.sort((a, b) => b.result - a.result);
    
    const pollData = {
      title: poll.title,
      desc: poll.desc,
      visibility: poll.visibility,
      choices: choices,
      votingPeriod: poll.votingPeriod,
      dateCreated: poll.dateCreated,
      totalVotes: poll.totalVotes,
      timelimit: timelimit,
      active: poll.active,
      category: poll.category,
      visits: poll.visits,
      multiChoice: poll.multiChoice,
      maxSelectChoices: poll.maxSelectChoices,
      entries: sortedEntries
    }
    
    res.status(200).json({pollData, userData});
    
  } catch (err) {
    console.log(err)
  }
});

module.exports = router;