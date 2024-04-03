const nodemailer = require('nodemailer')
const sgTransport = require('nodemailer-sendgrid-transport')

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport(
      sgTransport({
        auth: {
          api_key: process.env.SENDGRID_API_KEY
        }
      })
    )
    const mailTrapTransport = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
      }
    })

    await mailTrapTransport.sendMail({
      from: `Blog <${process.env.SENDER_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      text: options.message
    })
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

module.exports = sendEmail
