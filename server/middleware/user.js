const User = require('../models/User');

// Find user MiddleWare, if no user create user doc. 
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.exists({ ip: req.clientIp });
    console.log(user);
    if(user) {
      user = await User.findOne({ ip: req.clientIp });
      res.user = user;
      next();
    } else {
      console.log('doesnt user exists');
      let newUser = await new User({ ip: req.clientIp });
      newUser = await newUser.save();
      res.user = newUser;
      next();
    }
  } catch (err) {
    console.error(err);
    return res.status(500);
  }
}

module.exports = getUser;