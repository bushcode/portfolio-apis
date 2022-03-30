const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const xoauth2 = require('xoauth2');

const MailOps = {};

MailOps.sendMail = async (req, res, next) => {
	try {
		const { name, email, message } = req.body;
		let to = process.env.EMAIL_USER;
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});
		let mailOptions = {
			from: email,
			to: to,
			subject: 'New Porfolio Message',
			text: `You have a new message from: ${name},
					Email: ${email},
					Message: ${message},`,
		};
		let info = await transporter.sendMail(mailOptions);
		console.log('Message sent: %s', info.messageId);
		return res.status(200).json({ message: 'Message sent!' });
	} catch (error) {
		next(error);
		console.log(error);
		return res.status(400).json({ errors: 'Something went wrong please try again.' });
	}
};

module.exports = MailOps;
