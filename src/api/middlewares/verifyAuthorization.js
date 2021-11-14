const jwt = require('jsonwebtoken');
const { ROLE } = require('../../config/index');
module.exports = (req, res, next) => {
  const {authorization} = req.headers;
  if(!authorization) {
    res.locals.user = {
      role: ROLE.patient
    }
  } else {
    const token = authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    res.locals.user = user;
  }

  next();
}