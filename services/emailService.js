import { createTransport } from 'nodemailer';

async function sendMail({ to, subject, html }) {
    const transporter = createTransport({
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_USER_PASSWORD
        }
    })
    const info = await transporter.sendMail({
        from: `Parking Manager`,
        subject,
        to,
        html,
    })
    // console.log(info);
}

export default sendMail;