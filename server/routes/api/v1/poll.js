const express = require('express');
const router = express.Router();

const Poll = require('../../../models/Poll');
const Vote = require('../../../models/Vote');
const Visit = require('../../../models/Visit');

const moment = require('moment');
require('moment-precise-range-plugin');

// router.post('/poll/:slug', async (req, res) => {
//   // console.log(req.clientIp);
//   let clientIp = req.clientIp;
//   if (req.headers['x-ip'] !== 'undefined') {
//     clientIp = req.headers['x-ip'];
//   }
//   //console.log(clientIp);;

//   try {
//     let poll = await Poll.findOne({ url: req.params.slug });
//     if(poll !== null) {
//       // const visit = await Visit.findOne({ url: req.params.slug, ip: clientIp });
//       // if(visit == null) {
//       //   console.log('clientIp: ' + clientIp);
//       //   let newVisit = await new Visit({ url: req.params.slug, ip: clientIp });
//       //   newVisit = await newVisit.save();
        
//       // } 
//       poll = await Poll.findOneAndUpdate({ url: req.params.slug },
//         { $inc: {
//           visits: 1
//          }
//        }, {new: true}
//       );

//       const userDidVote = await Vote.exists({ url: req.params.slug, ip: clientIp });

//       const userData = { 
//         didVote: userDidVote
//       };

//       // if poll is active calculate timelimit
//       let timelimit = '';
//       if(poll.active) {
//         const endTime = moment(poll.dateCreated,'YYYY-MM-DD HH:mm:ss').add(poll.votingPeriod, 'hours');
//         const currentTime = moment(new Date(),'YYYY-MM-DD HH:mm:ss');
//         if(endTime > currentTime) {
//           const diff = moment.preciseDiff(endTime, currentTime, true);
//           const days = diff.days;
//           const hours = diff.hours;
//           const minutes = diff.minutes;
//           if (days > 0) timelimit += ` ${days} days`;
//           if (hours > 0) timelimit += ` ${hours} hours`;
//           if (minutes > 0) timelimit += ` ${minutes} minutes`;
//           if (timelimit === '') timelimit += ' less than 1 minute';
//         } else {
//           timelimit = 'Voting has ended'
//           poll = await Poll.findOneAndUpdate({ url: req.params.slug }, { active: false }, {new: true});
//         }
//       } else {
//         timelimit = 'Voting has ended'
//       }

//       const pollData = {
//         title: poll.title,
//         desc: poll.desc,
//         visibility: poll.visibility,
//         choices: poll.choices,
//         votingPeriod: poll.votingPeriod,
//         dateCreated: poll.dateCreated,
//         totalVotes: poll.totalVotes,
//         timelimit: timelimit,
//         active: poll.active,
//         results: poll.results,
//         category: poll.category,
//         visits: poll.visits,
//       }

//       res.status(200).json({pollData, userData});
//     } else {
//       res.status(404).json({ message: 'not found'});
//     }
//   } catch (err) {
//     console.log(err)
//   }
// });

// async function getVisits(req, res, next) {
//   try {
//     // if poll exists -> check if new session -> if visit exists -> create new visit doc
//     const poll = await Poll.exists({ url: req.params.slug });
//     const pll = await Poll.findOne({url: req.params.slug });
//     console.log(pll)
//     if(poll) {
//       const visit = await Visits.exists({ url: req.params.slug, ip: req.clientIp });
//       if(visit) {
//         next();
//       } else {
//         const newVisit = await Visits({ url: req.params.slug, ip: req.clientIp });
//         newVisit = await newVisit.save();
        
//         const pollVisit = await Poll.findOneAndUpdate({ url: req.params.slug },
//           { $inc: {
//             visits: 1
//            }
//          }, {new: true}
//         );
//         console.log(pollVisit);
//         next();
//       }
//     }
//   } catch(err) {
    
//   }
//   next();
// }



router.post('/poll/:slug', async (req, res) => {
  let clientIp = req.clientIp;

  // for heroku routing issue
  let ipAddr = req.headers["x-forwarded-for"];
  if (ipAddr){
    let list = ipAddr.split(",");
    ipAddr = list[list.length-1];
  } else {
    ipAddr = req.connection.remoteAddress;
  }

  console.log(ipAddr);

  if (req.headers['x-ip'] !== 'undefined') {
    clientIp = req.headers['x-ip'];
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
        timelimit = 'Voting has ended'
        poll = await Poll.findOneAndUpdate({ url: req.params.slug }, { active: false }, {new: true});
      }
    } else {
      timelimit = 'Voting has ended'
    }
    
    const userDidVote = await Vote.exists({ url: req.params.slug, ip: clientIp });
    
    const userData = { 
      didVote: userDidVote
    };
    
    const pollData = {
      title: poll.title,
      desc: poll.desc,
      visibility: poll.visibility,
      choices: poll.choices,
      votingPeriod: poll.votingPeriod,
      dateCreated: poll.dateCreated,
      totalVotes: poll.totalVotes,
      timelimit: timelimit,
      active: poll.active,
      results: poll.results,
      category: poll.category,
      visits: poll.visits,
    }
    
    res.status(200).json({pollData, userData});
    
  } catch (err) {
    console.log(err)
  }
});

module.exports = router;