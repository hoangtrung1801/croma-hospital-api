const bcrypt = require('bcryptjs');
module.exports = {
  hashPassword: (password) => {
    return bcrypt.hashSync(password, 10);
  },
  comparePassword: (password1, password2) => {
    return bcrypt.compareSync(password1, password2);
  }
}