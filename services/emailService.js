const nodemailer = require('nodemailer');

async function sendMail({ from, to, subject, text, html }) {
    const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE,
        auth: {
            user:process.env.SMTP_USER ,
            pass:process.env.SMTP_USER_PASSWORD
        }
    })
       const info =  await transporter.sendMail({
            from: `Parking Manager < ${from} >`,
            subject,
            to,
            html,
            text
        })
        console.log(info);
}

module.exports = sendMail;