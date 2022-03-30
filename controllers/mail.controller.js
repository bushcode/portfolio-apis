const nodemailer = require('nodemailer');
const axios = require('axios');

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

MailOps.FetchNFTS = async (req, res, next) => {
	try {
		const response = await axios.get(
			`https://testnets-api.opensea.io/assets?asset_contract_address=${process.env.OPEN_SEA_ADDRESS}&order_direction=asc`,
		);
		const punkList = response.data.assets;
		return res.status(200).json(punkList);
	} catch (error) {
		next(error);
	}
};
module.exports = MailOps;
