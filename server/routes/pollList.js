const express = require('express');
const router = express.Router();

const Poll = require('../models/Poll');
const moment = require('moment');


router.get('/polls', async (req, res) => {
  let pollsArr = [];
  let skip;
  let page = Math.round(req.query.page);

  try {
    const totalItems = await Poll.countDocuments({ visibility: 'public' });
    const totalPages = Math.ceil(totalItems/10);
    page = Math.min(Math.max(page, 1), totalPages);
    skip = (page - 1) * 10;
    if (skip < 0) {
      skip = 0;
    }
    
    const polls = await Poll.find({ visibility: 'public' }).skip(skip).sort({ dateCreated: -1 }).limit(10);
    for (let i = 0; i < polls.length; i++) {
      pollsArr.push({
        url: polls[i].url,
        title: polls[i].title,
        desc: polls[i].desc,
        totalVotes: polls[i].totalVotes,
        votingPeriod: polls[i].votingPeriod,
        dateCreated: moment(polls[i].dateCreated).startOf('minute').fromNow()
      });
    }
    res.status(200).json({
      pollsArr: pollsArr,
      totalItems: totalItems
    });

  } catch (err) {
    console.log(err)
  }
});


module.exports = router;