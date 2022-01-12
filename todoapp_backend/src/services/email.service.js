const nodemailer = require("nodemailer");

const config = require("../config/config");
const logger = require("../config/logger");

const transport = nodemailer.createTransport({
    ...config.email.smtp,
    port: 587,
});

if (config.env !== "test") {
    transport
        .verify()
        .then(() => logger.info("Connected to SMTP server"))
        .catch(() => logger.warn("Could not connect to SMTP server"));
}

const sendEmail = async (to, subject, content) => {
    const message = {
        from: config.email.from,
        to,
        subject,
        html: content,
    };
    await transport.sendMail(message);
};

const sendVerificationEmail = async (user, verifyEmailToken, callbackURL) => {
    const subject = "Verify your email";
    const verificationEmailURL = `${callbackURL}?token=${verifyEmailToken}`;
    const content = `
        Dear ${user.name},
        <br />
        To verify your email, please click on the following link:
        <br />
        <a href="${verificationEmailURL}">${verificationEmailURL}</a>
    `;
    await sendEmail(user.email, subject, content);
};

module.exports = {
    transport,
    sendVerificationEmail,
};
