function publicApiAuth(req, res, next) {
  console.log(req.headers['origin']);
  if (req.headers['origin'] === 'statmix') {
    // custom header exists, then call next() to pass to the next function
    next();
 } else {
   res.sendStatus(403);      
 }
}

module.exports = publicApiAuth;

