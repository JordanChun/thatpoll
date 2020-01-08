const express = require('express');
const router = express.Router();

const Poll = require('../../../models/Poll');
const moment = require('moment');


router.post('/polls', async (req, res) => {
  const filters = {
    visibility: 'public'
  }
  let pollsArr = [];
  let skip;
  let page = Math.round(req.query.page);
  if (req.query.state === 'live') filters.active = true;
  if (req.query.state === 'ended') filters.active = false;


  try {
    const totalItems = await Poll.countDocuments({ visibility: 'public' });
    const totalPages = Math.ceil(totalItems/10);
    page = Math.min(Math.max(page, 1), totalPages);
    skip = (page - 1) * 10;
    if (skip < 0) {
      skip = 0;
    }
    
    const polls = await Poll.find(filters).skip(skip).sort({ dateCreated: -1 }).limit(10);
    for (let i = 0; i < polls.length; i++) {
      pollsArr.push({
        url: polls[i].url,
        title: polls[i].title,
        desc: polls[i].desc,
        totalVotes: polls[i].totalVotes,
        dateCreated: moment(polls[i].dateCreated).startOf('minute').fromNow(),
        active: polls[i].active,
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