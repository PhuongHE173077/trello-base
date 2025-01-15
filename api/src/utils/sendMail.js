import nodemailer from "nodemailer"
import { env } from "~/config/environment"

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: 'phuongddhe173077@fpt.edu.vn',
    pass: 'bufn zkre ligo pjsz'
  }
})

export const sendEmail = async (formName, receivers, subject, text) => {
  console.log("🚀 ~ sendEmail ~ receivers:", receivers)
  console.log(env.MAIL_ACCOUNT, env.MAIL_PASSWORD);

  return await transporter.sendMail({
    from: formName, // sender address
    to: receivers.toString(), // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: "<b>Hello world?</b>", // html body
  })
}
