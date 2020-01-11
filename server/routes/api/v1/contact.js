const express = require('express');
const router = express.Router();

const getUser = require('../../../middleware/user');
const Contact = require('../../../models/Contact');
const validator = require('validator');

router.post('/contact', getUser, async (req, res) => {
  let user = res.user;

  if (!validator.isLength(req.body.text, { min: 10, max: 500 })) {
    return res.status(400).json({ message: 'error '}).end();
  };

  try {

    const contact = await new Contact({
      ip: user.ip,
      text: req.body.text,
    });

    await contact.save()

    res.status(200).json({ message: 'success' });

  } catch (err) {
    return res.status(400).json({ message: 'error '}).end();
    console.log(err)
  }
});

module.exports = router;