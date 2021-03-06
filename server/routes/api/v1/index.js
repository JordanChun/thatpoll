const express = require('express');
const router = express.Router();
//const publicApiAuth = require('../../../middleware/publicApiAuth');

//router.use(publicApiAuth);
router.use('/', require('./pollList'));
router.use('/', require('./createPoll'));
router.use('/', require('./poll'));
router.use('/', require('./vote'));
router.use('/', require('./results'));
router.use('/', require('./report'));
router.use('/', require('./contact'));

module.exports = router;