const express = require('express');
const router = express.Router();
const Projects = require('../controllers/projects.controller');
const VerifyToken = require('../middleware/auth').verifyToken;
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    // console.log(file);
    cb(
      null,
      new Date().getTime().toString() + '-' + file.fieldname + path.extname(file.originalname)
    );
  }
});
const upload = multer({ storage: storage });

router.post('/api/projects/add', VerifyToken, upload.single('image'), Projects.CreateProject);
router.get('/api/projects/fetch', VerifyToken, Projects.FetchProjects);
router.get('/api/projects/public', Projects.FetchProjects);
router.get('/api/projects/fetch/:id', VerifyToken, Projects.FetchProject);
router.delete('/api/projects/delete/:id', VerifyToken, Projects.DeleteProject);

module.exports = router;
