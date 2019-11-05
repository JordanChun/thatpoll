const express = require('express');
const router = express.Router();
const requestIp = require('request-ip');
const publicApiAuth = require('../middleware/publicApiAuth');

router.use(requestIp.mw())
router.use(publicApiAuth);
router.use('/', require('./pollList'));
router.use('/', require('./createPoll'));
router.use('/', require('./poll'));
router.use('/', require('./choices'));
router.use('/', require('./vote'));
router.use('/', require('./results'));

module.exports = router;