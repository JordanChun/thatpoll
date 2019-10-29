const express = require('express');
const router = express.Router();

const getUser = require('../middleware/user');
const User = require('../models/User');
const Poll = require('../models/Poll');
const shortid = require('shortid');

router.post('/create-poll', getUser, async (req, res) => {

  //console.log(res.user)
  let user = res.user;
  const url = shortid.generate();
  
  const {
    title,
    desc,
    visibility,
    votingPeriod,
    choices,
  } = req.body;
  
  //TO DO ##############################################
  //Validate Poll Inputs BEFORE DATABASE
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

module.exports = router;