const sgMail = require('@sendgrid/mail')
const sendGridAPIKey = process.env.SEND_GRID_API
sgMail.setApiKey(sendGridAPIKey)

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'cadena@cadena.com',
    subject: 'Welcome to the app!',
    text: `Hi ${name}, welcome!`
  })
}

const sendCancelEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'cadena@cadena.com',
    subject: "We'll miss you :(",
    text: `We hope see you soon, ${name}`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancelEmail
}