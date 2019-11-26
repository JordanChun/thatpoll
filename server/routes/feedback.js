const express = require('express');
const router = express.Router();

const getUser = require('../middleware/user');
const Feedback = require('../models/Feedback');
const validator = require('validator');

router.post('/feedback', getUser, async (req, res) => {
  let user = res.user;

  if (!validator.isLength(req.body.text, { min: 10, max: 500 })) {
    return res.status(400).json({ message: 'error '}).end();
  };

  try {

    const feedback = await new Feedback({
      ip: user.ip,
      text: req.body.text,
    });

    await feedback.save()

    res.status(200).json({ message: 'success' });

  } catch (err) {
    return res.status(400).json({ message: 'error '}).end();
    console.log(err)
  }
});

module.exports = router;