const express = require('express');
const router = express.Router();

const getUser = require('../middleware/user');
const Poll = require('../models/Poll');
const shortid = require('shortid');

router.post('/create-poll', getUser, createPollAuth, async (req, res) => {
  let user = res.user;
  const url = shortid.generate();
  
  const {
    title,
    desc,
    visibility,
    votingPeriod,
    choices,
  } = req.body;
  
  /*
  //TO DO ##############################################
  //Validate Poll Inputs BEFORE DATABASE

  if (title.length <= 0 || title.length > 100) {
    res.status(409).json({ message: 'error' });
  }

  if (title.length < 0 || title.length > 400) {
    res.status(409).json({ message: 'error' });
  }

  if (choices.length < 2 || choices.length > 4) {
    res.status(409).json({ message: 'error' });
  }
  
  choices.forEach(choice => {
    if (choice.length < 0 || choice.length > 50) {
      res.status(409).json({ message: 'error' });
    }
  });

  let findDuplicates = choices.filter((item, index) => choices.indexOf(item) != index);
  if (findDuplicates.length > 0) {
    res.status(409).json({ message: 'error' });
  }

  if (votingPeriod < 6 || votingPeriod > 72 ) {
    res.status(409).json({ message: 'error' });
  }
  
  if (visibility !== 'public' && visibility !== 'private') {
    res.status(409).json({ message: 'error' });
  }
  */

  try {
    user.createdPolls.push(url);
    user = await user.save();
    let results = [];
    choices.forEach(() => {
      results.push(0);
    });
    let poll = await new Poll({
      creatorIp: user.ip,
      url: url,
      title: title,
      desc: desc,
      choices: choices,
      visibility: visibility,
      votingPeriod: votingPeriod,
      results: results
    });
    poll = await poll.save();
    res.status(201).json({ message: 'success', url: url });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'error' });
  }

});

function createPollAuth(req, res, next) {
  const {
    title,
    desc,
    visibility,
    votingPeriod,
    choices,
  } = req.body;

  if (title.length <= 0 || title.length > 100) {
    res.status(409).json({ message: 'error' });
  }

  if (desc.length < 0 || desc.length > 400) {
    res.status(409).json({ message: 'error' });
  }

  if (choices.length < 2 || choices.length > 4) {
    res.status(409).json({ message: 'error' });
  }
  
  choices.forEach(choice => {
    if (choice.length < 0 || choice.length > 50) {
      res.status(409).json({ message: 'error' });
    }
  });

  let findDuplicates = choices.filter((item, index) => choices.indexOf(item) != index);
  if (findDuplicates.length > 0) {
    return res.status(409).json({ message: 'error' }).end();
  }

  if (votingPeriod < 6 || votingPeriod > 72 ) {
    return res.status(409).json({ message: 'error' });
  }
  
  if (visibility !== 'public' && visibility !== 'private') {
    return res.status(409).json({ message: 'error' });
  }

  next();
}

module.exports = router;