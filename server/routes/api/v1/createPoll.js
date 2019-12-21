const express = require('express');
const router = express.Router();

const getUser = require('../../../middleware/user');
const Poll = require('../../../models/Poll');
const shortid = require('shortid');
const validator = require('validator');
const moment = require('moment');

const CategoriesList = require('../../../../helpers/CategoriesList');

router.post('/create-poll', getUser, createPollAuth, async (req, res) => {
  let user = res.user;

  // created less than 10 polls
  if (user.pollLimitCounter >= 10) {
    const lastCreated = moment(user.lastCreated)
    const hours = moment.duration(moment(new Date()).diff(lastCreated)).asHours();
    // if last created was more than 5 hours ago
    if (hours > 5) {
      user.pollLimitCounter = 0;
    } else {
      return res.status(400).json({ message: 'limit' });
    }
  }
  
  const url = shortid.generate();
  
  const {
    title,
    desc,
    visibility,
    votingPeriod,
    choices,
    category,
    multiIp
  } = req;
  
  try {
    user.createdPolls.push(url);
    user.pollLimitCounter++;
    user.lastCreated = new Date();
    user = await user.save();
    
    let results = [];
    choices.forEach(() => {
      results.push(0);
    });
    let categoryName;
    if (category === 0) {
      // If select category is 'Select a category' set to 'Other' (last item)
      // Array starts at 0, minus 1 to correct last item
      categoryName = CategoriesList[CategoriesList.length - 1];
    } else {
      categoryName = CategoriesList[category - 1]
    }

    let poll = await new Poll({
      creatorIp: user.ip,
      url: url,
      title: title,
      desc: desc,
      choices: choices,
      visibility: visibility,
      votingPeriod: votingPeriod,
      results: results,
      category: categoryName,
      multiIp: multiIp,
      dateCreated: new Date()
    });
    poll = await poll.save();
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
  req.votingPeriod = req.body.votingPeriod;
  req.category = req.body.category;
  req.multiIp = req.body.multiIp;

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

  if (typeof req.multiIp !== "boolean") {
    return res.status(400).json({ message: 'error' }).end();
  }

  if (req.category < 0 || req.category > CategoriesList.length - 1) {
    return res.status(400).json({ message: 'error' }).end();
  }

  next();
}

module.exports = router;