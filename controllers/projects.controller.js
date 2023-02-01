const Project = require('../models/project');
const ProjectValidator = require('../validators/project.js');
const Helpers = require('../utils/Helpers');
var cloudinary = require('cloudinary').v2;

const ProjectOps = {};

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true
});

ProjectOps.CreateProject = async (req, res, next) => {
  try {
    const { file } = req;

    const upload = await cloudinary.uploader.upload(file.path, { tags: 'basic_sample' });

    // console.log(upload.secure_url);

    const { title, description, link, stack, repository, isLab } = req.body;
    const { errors, isValid } = ProjectValidator(req.body);
    if (!isValid) return res.status(400).json(errors);

    await new Project({
      title,
      description,
      isLab,
      link,
      stack: Array.isArray(stack) ? stack : stack.split(',').map((stack) => ' ' + stack.trim()),
      repository,
      image: upload.secure_url
    }).save();

    const projects = await Project.find();
    return res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

ProjectOps.FetchProjects = async (req, res, next) => {
  try {
    const projects = await Project.find();
    // console.log(projects);
    if (!projects) return res.status(404).json({ errors: 'No resource found' });
    return res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

ProjectOps.FetchProject = async (req, res, next) => {
  try {
    const projects = await Project.find().where({ isDeleted: false }).sort({ 'createdAt': -1 });
    if (!projects) return res.status(404).json({ errors: 'No resource found' });
    return res.status(200).json(projects);
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
          isDeleted: true
        }
      },
      { new: true }
    );
    // console.log(project);
    const projects = await Project.find().where({ isDeleted: false });
    return res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

module.exports = ProjectOps;
