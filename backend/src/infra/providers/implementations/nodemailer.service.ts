import nodemailer from 'nodemailer'
import { IEmailService } from '../models/IEmailService'
import { email } from '@/config/email'

interface IMailOptions {
  from: string
  to: string
  subject: string
  text?: string
  html?: string
}




export class NodeMailerService implements IEmailService {
  private init() {
    const transporter = nodemailer.createTransport({
      host: email.HOSTINGER_EMAIL_HOST,
      port: email.HOSTINGER_EMAIL_PORT,
      secure: true,
      auth: {
        user: email.HOSTINGER_EMAIL_USER,
        pass: email.HOSTINGER_EMAIL_PASSWORD,
      },
    })

    return transporter
  }

  async sendEmail(
    to: string,
    subject: string,
    content: string,
    html?: boolean | undefined,
  ): Promise<void> {
    const transporter = this.init()

    let mailOptions: IMailOptions = {
      from: email.HOSTINGER_EMAIL_USER!,
      to,
      subject,
    }

    html == true ? (mailOptions.html = content) : (mailOptions.text = content)

    return await transporter.sendMail(mailOptions)
  }
}
