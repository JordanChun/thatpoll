const express = require('express');
const router = express.Router();

const Poll = require('../models/Poll');
const Visits = require('../models/Visits');


router.get('/poll/:slug', async (req, res) => {
  try {
    const poll = await Poll.findOne({ url: req.params.slug });
    if(poll !== null) {
      //const visits = await Visits.countDocuments({ url: req.params.slug });
      const pollData = {
        title: poll.title,
        desc: poll.desc,
        visibility: poll.visibility,
        choices: poll.choices,
        votingPeriod: poll.votingPeriod,
        dateCreated: poll.dateCreated,
        visits: 0
      }
      res.status(200).json(pollData);
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