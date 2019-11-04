function publicApiAuth(req, res, next) {
  if (req.headers['x-origin'] === 'statmix') {
    // custom header exists, then call next() to pass to the next function
    next();
  } else {
    res.sendStatus(403);      
  }
}

module.exports = publicApiAuth;
