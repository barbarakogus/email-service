const nodemailer = require('nodemailer');

const sendMail = async (emailReq) => {

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.USER, 
            pass: process.env.PASS 
        }
    })

    const options = {
        from: process.env.USER,
        to: process.env.EMAIL,
        subject: emailReq.subject || 'Contact made by portfolio site',
        text: `${emailReq.name}, email: ${emailReq.email} wants to contact you. Message: ${emailReq.message}`
    }

    return new Promise((resolve, reject) => {
        transporter.sendMail(options, (err, info) => {
            if (err) {
                console.log('mailService', err);
                reject(err); 
            } else {
                console.log('email sent ' + info.response);
                resolve(info);
            }
        });
    });
}

module.exports = { sendMail }