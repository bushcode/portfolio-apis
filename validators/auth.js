const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function ValidateAuthInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username cannot be empty';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
