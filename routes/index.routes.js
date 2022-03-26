const express = require('express');
const cors = require('cors');
const router = express.Router();
router.use(cors());

const Auth = require('./auth.routes');
const Projects = require('./projects.routes');

router.use(Auth);
router.use(Projects);

router.get('/api', function (req, res, next) {
  res.status(200).json({ message: 'Welcome to wonderland 💃🏾' });
});

module.exports = router;
