const express = require('express');
const router = express.Router();

const Poll = require('../models/Poll');
const moment = require('moment');


router.get('/polls/page/:page', async (req, res) => {
  let pollsArr = [];
  try {
    const polls = await Poll.find().limit(25);
    for (let i = 0; i < polls.length; i++) {
      pollsArr.push({
        url: polls[i].url,
        title: polls[i].title,
        desc: polls[i].desc,
        totalVotes: polls[i].totalVotes,
        votingPeriod: polls[i].votingPeriod,
        dateCreated: moment(polls[i].dateCreated).startOf('hour').fromNow()
      });
    }

    //console.log(pollsArr);
    res.send(pollsArr.reverse());
  } catch (err) {
    console.log(err)
  }
});


module.exports = router;