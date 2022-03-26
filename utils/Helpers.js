const bcrypt = require('bcryptjs');

const Helpers = {};

Helpers.HashValue = function HashValue(value) {
  return bcrypt.hashSync(value, 12);
};

Helpers.UnHashValue = function UnHashValue(plain, hashedValue) {
  return bcrypt.compareSync(plain, hashedValue);
};

Helpers.SanitizeDate = (d) => {
  const dd = new Date(d).toISOString().substr(0, 10);
  let year = dd.split('-')[0];
  let month = dd.split('-')[1];
  let day = dd.split('-')[2];
  let dt = `${day}/${month}/${year}`;
  return dt;
};

module.exports = Helpers;
