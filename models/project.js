const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	link: {
		type: String,
	},
	repository: {
		type: String,
	},
	stack: [
		{
			type: String,
		},
	],
	image: {
		type: String,
	},
	isLab: {
		type: Boolean,
		default: false,
	},
	isDeleted: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Project = mongoose.model('project', ProjectSchema);
