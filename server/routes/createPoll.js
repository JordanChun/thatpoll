const express = require('express');
const router = express.Router();

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

    let poll = await new Poll({
      creatorIp: user.ip,
      url: url,
      title: title,
      desc: desc,
      choices: choices,
      visibility: visibility,
      votingPeriod: votingPeriod
    });
    poll = await poll.save();
    res.status(201).json({ message: 'success', url: url });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'error' });
  }
});

// Find user MiddleWare, if no user create user doc. 
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.exists({ ip: req.clientIp });
    console.log(user);
    if(user) {
      user = await User.findOne({ ip: req.clientIp });
      res.user = user;
      next();
    } else {
      console.log('doesnt user exists');
      let newUser = await new User({ ip: req.clientIp });
      newUser = await newUser.save();
      res.user = newUser;
      next();
    }
  } catch (err) {
    console.error(err);
    return res.status(500);
  }
}

module.exports = router;