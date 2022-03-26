const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function ValidateProjectInput(data) {
	let errors = {};

	data.title = !isEmpty(data.title) ? data.title : '';
	data.description = !isEmpty(data.description) ? data.description : '';

	if (Validator.isEmpty(data.title)) {
		errors.title = 'Title cannot be empty';
	}

	if (Validator.isEmpty(data.description)) {
		errors.description = 'description field is required';
	}

	if (Validator.isEmpty(data.link)) {
		errors.link = 'link field is required';
	}

	if (Validator.isEmpty(data.stack)) {
		errors.stack = 'stack field is required';
	}
	return {
		errors,
		isValid: isEmpty(errors),
	};
};
