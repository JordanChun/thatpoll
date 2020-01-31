const express = require('express');
const router = express.Router();

const Poll = require('../../../models/Poll');
const moment = require('moment');

router.post('/polls', async (req, res) => {
  const filters = { visibility: 'public' };
  let pollsArr = [];
  let skip;
  let page = Math.round(req.query.page);
  const sortBy = {};

  if (req.query.status === 'live') filters.active = true;
  if (req.query.status === 'ended') filters.active = false;

  switch (req.query.most) {
    case 'today':
      filters.dateCreated = { $gte: moment(new Date()).startOf('day').toISOString(), $lte: moment(new Date()).endOf('day').toISOString()}
      sortBy.totalVotes = -1;
      break;
    case 'week':
      filters.dateCreated = { $gte: moment(new Date()).startOf('week').toISOString(), $lte: moment(new Date()).endOf('week').toISOString() };
      sortBy.totalVotes = -1;
      break;
    case 'month':
      filters.dateCreated = { $gte: moment(new Date()).startOf('month').toISOString(), $lte: moment(new Date()).endOf('month').toISOString() };
      sortBy.totalVotes = -1;
      break;
    case 'year':
      filters.dateCreated = { $gte: moment(new Date()).startOf('year').toISOString(), $lte: moment(new Date()).endOf('year').toISOString() };
      sortBy.totalVotes = -1;
      break;
    case 'all':
      sortBy.totalVotes = -1;
      break;
    default:
      sortBy.dateCreated = -1;
      break;
  }

  try {
    const totalItems = await Poll.countDocuments(filters);
    const totalPages = Math.ceil(totalItems/10);
    page = Math.min(Math.max(page, 1), totalPages);
    skip = (page - 1) * 10;
    if (skip < 0) {
      skip = 0;
    }

    const polls = await Poll.find(filters).sort(sortBy).skip(skip).limit(10);
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