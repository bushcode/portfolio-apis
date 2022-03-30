const express = require('express');
const cors = require('cors');
const router = express.Router();
router.use(cors());
const Mailer = require('../controllers/mail.controller');

const Auth = require('./auth.routes');
const Projects = require('./projects.routes');

router.use(Auth);
router.use(Projects);

router.get('/api', function (req, res, next) {
	res.status(200).json({ message: 'Welcome to wonderland 💃🏾' });
});

router.post('/api/sendMail', Mailer.sendMail);
router.get('/api/fetchNFTs', Mailer.FetchNFTS);

module.exports = router;
