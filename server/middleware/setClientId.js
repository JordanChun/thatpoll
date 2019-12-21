
function setClientId(req, res, next) {
  let clientId = req.signedCookies.cid;

  if (clientId === undefined) {
    clientId = generateClientId();
    res.cookie('cid', clientId, { maxAge: 2147483647, httpOnly: true, signed: true });
    req.cid = clientId;
    next();
  } else {
    req.cid = clientId;
    next();
  } 
}

function generateClientId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

module.exports = setClientId;