const Project = require('../models/project');
const ProjectValidator = require('../validators/project.js');
const Helpers = require('../utils/Helpers');

const ProjectOps = {};

ProjectOps.CreateProject = async (req, res, next) => {
	try {
		const { file } = req;
		console.log('file', file);
		const { title, description, link, stack, repository } = req.body;
		const { errors, isValid } = ProjectValidator(req.body);
		if (!isValid) return res.status(400).json(errors);

		const newProject = await new Project({
			title,
			description,
			link,
			stack: Array.isArray(stack)
				? stack
				: stack.split(',').map((stack) => ' ' + stack.trim()),
			repository,
			image: file.path,
		}).save();

		const projects = await Project.find().where({ isDeleted: false });
		return res.status(200).json(projects);
	} catch (error) {
		console.log(error);
		next(error);
	}
};

ProjectOps.FetchProjects = async (req, res, next) => {
	try {
		const projects = await Project.find().where({ isDeleted: false });
		if (!projects) return res.status(404).json({ errors: 'No resource found' });
		return res.status(200).json(projects);
	} catch (error) {
		next(error);
	}
};

ProjectOps.FetchProject = async (req, res, next) => {
	try {
		const { id } = req.params;
		let project = await Project.findOne(id);
		if (!project) return res.status(400).json({ errors: 'No resource found' });
		return res.status(200).json(project);
	} catch (error) {
		next(error);
	}
};

ProjectOps.DeleteProject = async (req, res, next) => {
	try {
		const { id } = req.params;
		console.log(id);
		const project = await Project.findOneAndUpdate(
			{ _id: id },
			{
				$set: {
					isDeleted: true,
				},
			},
			{ new: true },
		);
		console.log(project);
		const projects = await Project.find().where({ isDeleted: false });
		return res.status(200).json(projects);
	} catch (error) {
		next(error);
	}
};

module.exports = ProjectOps;
