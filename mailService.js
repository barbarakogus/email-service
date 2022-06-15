const nodemailer = require('nodemailer');

const sendMail = (emailReq) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: process.env.ACCESS_TOKEN
        }
    })

    const options = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: emailReq.subject || 'contact made by portfolio site',
        text: `The ${emailReq.name}, email: ${emailReq.email} wants to contact you. Message: ${emailReq.message}`
    }

    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            console.log('email send ' + info.response)
        }
    })
}

module.exports = { sendMail }