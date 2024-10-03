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
            //user: process.env.EMAIL,
            //type: 'OAuth2',
            //clientId: process.env.CLIENT_ID,
            //clientSecret: process.env.CLIENT_SECRET,
            //refreshToken: process.env.REFRESH_TOKEN,
            //accessToken: process.env.ACCESS_TOKEN
            
        }
    })

    const options = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: emailReq.subject || 'contact made by portfolio site',
        text: `The ${emailReq.name}, email: ${emailReq.email} wants to contact you. Message: ${emailReq.message}`
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