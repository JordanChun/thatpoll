const express = require('express');
const router = express.Router();

const getUser = require('../middleware/user');
const Report = require('../models/Report');
const validator = require('validator');

router.post('/report', getUser, async (req, res) => {
  let user = res.user;

  if (!validator.isLength(req.body.urlRef, { min: 5, max: 15 })) {
    return res.status(400).json({ message: 'error '}).end();
  };

  if (!validator.isLength(req.body.reason, { min: 5, max: 500 })) {
    return res.status(400).json({ message: 'error '}).end();
  };

  const categoies = ['Abuse', 'Bug', 'Spam'];

  if (req.body.category < 1 && req.body.category > 3) {
    return res.status(400).json({ message: 'error '}).end();
  } 

  try {

    const report = await new Report({
      ip: user.ip,
      text: req.body.reason,
      category: categoies[req.body.category - 1],
      urlRef: req.body.urlRef
    });

    await report.save()

    res.status(200).json({ message: 'success' });

  } catch (err) {
    return res.status(400).json({ message: 'error '}).end();
    console.log(err)
  }
});

module.exports = router;