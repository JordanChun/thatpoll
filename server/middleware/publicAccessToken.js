const jwt = require('jsonwebtoken');
// const config = require('../server.config');

// function setPublicAccessToken(req, res, next) {
//   let publicAccessToken = req.cookies.publicAccessToken;

//   if (publicAccessToken === undefined) {
//     publicAccessToken = createPublicAccessToken();
//     // max age 7 days in seconds
//     res.cookie('publicAccessToken', publicAccessToken, { maxAge: 604800, httpOnly: false });
//     next();
//   } else {
//     jwt.verify(publicAccessToken, config.jwt.publicAuth, function(err, decoded) {
//       if (err) {
//         publicAccessToken = createPublicAccessToken();
//         res.cookie('publicAccessToken', publicAccessToken, { maxAge: 604800, httpOnly: false });
//       }
//     });
//     next();
//   } 
// }

// function createPublicAccessToken() {
//   const token = jwt.sign({
//     issued: Date.now()
//   }, config.jwt.publicAuth, { expiresIn: '7days' });

//   return token;
// }

// module.exports = setPublicAccessToken;