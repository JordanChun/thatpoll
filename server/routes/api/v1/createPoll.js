const express = require('express');
const router = express.Router();

const getUser = require('../../../middleware/user');
const Poll = require('../../../models/Poll');
const shortid = require('shortid');
const validator = require('validator');
const moment = require('moment');
const isDate = require('date-fns/isDate');
const addMinutes = require('date-fns/addMinutes');
const addYears = require('date-fns/addYears');

const CategoriesList = require('../../../../common/CategoriesList');
const colors = require('../../../../common/pollColors');

router.post('/create-poll', getUser, createPollAuth, async (req, res) => {
  let user = res.user;

  // created 10 or more than 10 polls

  if (user.pollLimitCounter >= 10) {
    const lastCreated = moment.utc(user.lastCreated);
    const hours = moment.duration(moment.utc(new Date()).diff(lastCreated)).asHours();
    // if last created was more than 5 hours ago
    if (hours > 5) {
      user.pollLimitCounter = 0;
    } else {
      return res.status(400).json({ message: 'limit' }).end();
    }
  }


  // if (user.pollLimitCounter >= 10) {
  //   const lastCreated = moment.utc(user.lastCreated);
  //   const hours = moment.duration(moment.utc(new Date()).diff(lastCreated)).asHours();
  //   // if last created was more than 5 hours ago
  //   if (hours > 5) {
  //     user.pollLimitCounter = 0;
  //   } else {
  //     return res.status(400).json({ message: 'limit' }).end();
  //   }
  // }
  
  const url = shortid.generate();
  
  const {
    title,
    desc,
    visibility,
    choices,
    category,
    multiIp,
    multiChoice,
    maxSelectChoices,
    pollExpires,
    endDate
  } = req;
  
  try {
    user.createdPolls.push(url);
    user.pollLimitCounter++;
    user.lastCreated = new Date();
    
    let categoryName;
    if (category === 0) {
      // If select category is 'Select a category' set to 'Other' (last item)
      // Array starts at 0, minus 1 to correct last item
      categoryName = CategoriesList[CategoriesList.length - 1];
    } else {
      categoryName = CategoriesList[category - 1]
    }
    
    const entries = [];
    for (let i = 0; i < choices.length; i++) {
      entries.push({
        choice: choices[i],
        result: 0,
        color: colors[i]
      });
    }

    const pollObj = {
      creatorIp: user.ip,
      url: url,
      title: title,
      desc: desc,
      visibility: visibility,
      category: categoryName,
      multiIp: multiIp,
      multiChoice: multiChoice,
      maxSelectChoices: maxSelectChoices,
      dateCreated: new Date(),
      entries: entries,
      pollExpires: pollExpires,
    }

    if (pollExpires) {
      pollObj.endDate = endDate;
    }
    
    const poll = await new Poll(pollObj);
    
    await poll.save();
    await user.save();
    return res.status(201).json({ message: 'success', url: url }).end();
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'error' }).end();
  }

});

function createPollAuth(req, res, next) {
  req.title = validator.trim(req.body.title)
  req.desc = validator.trim(req.body.desc)
  req.visibility = validator.trim(req.body.visibility)
  req.pollExpires = req.body.pollExpires;
  req.endDate = new Date(req.body.endDate);
  req.category = req.body.category;
  req.multiIp = req.body.multiIp;
  req.multiChoice = req.body.multiChoice;
  req.maxSelectChoices = req.body.maxSelectChoices;

  // validate choices
  if (Array.isArray(req.body.choices)) {
    // trim spaces left and right
    req.choices = [];
    req.body.choices.forEach(choice => {
      req.choices.push(validator.trim(choice));
    });

    if (req.choices.length < 2) {
      return res.status(400).json({ message: 'error' }).end();
    }
    // validate maximum choices
    if (req.choices.length > 30) {
      return res.status(400).json({ message: 'error' }).end();
    }
    // validate choice lengths, min 1, max 75 chars
    req.choices.forEach(choice => {
      if (!validator.isLength(choice, { min: 1, max: 75 })) {
        return res.status(400).json({ message: 'error' }).end();
      }
    });
    // find duplicate choices
    let findDuplicates = req.choices.filter((item, index) => req.choices.indexOf(item) != index);
    if (findDuplicates.length > 0) {
      return res.status(400).json({ message: 'duplicate' }).end();
    }
  } else {
    return res.status(400).json({ message: 'error' }).end();
  }

  // if title min 1 character max 120
  if (!validator.isLength(req.title, { min: 3, max: 120 })) {
    return res.status(400).json({ message: 'error' }).end();
  };

  if (!validator.isLength(req.desc, { min: 0, max: 500 })) {
    return res.status(400).json({ message: 'error' }).end();
  };

  
  if (req.votingPeriod < 6 || req.votingPeriod > 168) {
    return res.status(400).json({ message: 'error' }).end();
  }
  
  if (!validator.equals(req.visibility, 'public') && !validator.equals(req.visibility, 'private')) {
    return res.status(400).json({ message: 'error' }).end();
  }

  if (typeof req.pollExpires !== 'boolean' ||
    typeof req.multiIp !== "boolean" ||
    typeof req.multiChoice !== "boolean") {
      return res.status(400).json({ message: 'error' }).end();
  }
    
  if (!isDate(req.endDate)) {
    return res.status(400).json({ message: 'error' }).end();
  }

  if (req.pollExpires) {
    // add 29 minutes instead of 30 to give timing window
    if (req.endDate <= addMinutes(new Date(), 29) || req.endDate >= addYears(new Date(), 10)) {
      return res.status(400).json({ message: 'error' }).end();
    }
  }
  
  if (req.maxSelectChoices > req.choices.length || req.maxSelectChoices < 2) {
    return res.status(400).json({ message: 'error' }).end();
  }

  if (req.category < 0 || req.category > CategoriesList.length - 1) {
    return res.status(400).json({ message: 'error' }).end();
  }

  next();
}

module.exports = router;