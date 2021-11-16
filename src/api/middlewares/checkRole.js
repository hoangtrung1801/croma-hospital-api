const { ROLE } = require("../../config");

module.exports = (...roles) => {
  return (req, res, next) => {
    const {role} = res.locals.user;

    if(!(roles.find(c => c === role))) {
      // Unauthorized
      const err = new Error("Unauthorized");
      err.statusCode = 401;
      next(err);
    } else {
      next();
    }
  }
}