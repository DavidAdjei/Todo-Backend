const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    },
})

exports.hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash)
            })
        })
    })
}

exports.comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed);
}

exports.sendResetCode = async (user, code) => {
    const resetLink = `${process.env.CLIENT_URL}/reset-password`;

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: user.email,
        subject: "Password Reset Request",
        html: `<h1>Password Reset Code</h1> 
                <p>Enter this code to reset your password</p>
                <h4 style="text-align: center;">${code}</h4>`
    };

    try {
        const info = await transport.sendMail(mailOptions);
        console.log(info);
    } catch (err) {
        console.error("Error sending reset code: ", err)
    }
}