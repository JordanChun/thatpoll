const jwt = require('jsonwebtoken');

function publicApiAuth(req, res, next) {
  // if (req.headers['x-p_auth'] !== 'undefined') {
  //   const publicAccessToken = req.headers['x-p_auth'];
  //   jwt.verify(publicAccessToken, config.jwt.publicAuth, function(err, decoded) {
  //     if (err) {
  //       if (err.name === 'TokenExpiredError') {
  //         const newPublicAccessToken = jwt.sign({
  //           issued: Date.now()
  //         }, config.jwt.publicAuth, { expiresIn: '7days' });
  //         res.cookie('publicAccessToken', newPublicAccessToken, { maxAge: 604800, httpOnly: false });
  //         next();
  //       } else {
  //         res.sendStatus(403);
  //       }
  //     } else {
  //       next();
  //     }
  //   });
  // } else {
  //   res.sendStatus(403);      
  // }
  // if (req.headers['x-origin'] === 'statmix') {
  //   // custom header exists, then call next() to pass to the next function
  //   next();
  // } else {
  //   res.sendStatus(403);      
  // }
  next();
}

module.exports = publicApiAuth;
