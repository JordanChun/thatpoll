const express = require('express');
const router = express.Router();

router.use('/', require('./pollList'));
router.use('/', require('./createPoll'));
router.use('/', require('./poll'));
router.use('/', require('./vote'));

module.exports = router;