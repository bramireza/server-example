import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

const smtpTransport = new SMTPTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME!,
    clientId: process.env.OAUTH_CLIENTID!,
    clientSecret: process.env.OAUTH_CLIENT_SECRET!,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN!
  }
})

const transport = nodemailer.createTransport(smtpTransport)

interface SendMailArgs {
  email: string;
  subject: string;
  firstName: string;
  message: string;
}

interface GetTemplateArgs {
  firstName: string;
  message: string;
}

class MailController {
  getTemplate({ firstName, message }: GetTemplateArgs) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Template</title>
        <style>
          /* General styles */
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          table {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            border-collapse: collapse;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          th, td {
            padding: 15px;
            text-align: left;
          }
          h1 {
            font-size: 24px;
            margin: 0;
          }
          p {
            margin: 0 0 10px;
            line-height: 1.5;
          }
          /* Header style */
          .email-header {
            background-color: #007bff;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
          }
          /* Footer style */
          .email-footer {
            background-color: #f4f4f4;
            text-align: center;
            padding: 10px;
            color: #777777;
            font-size: 12px;
          }
          /* Button style */
          .btn {
            display: inline-block;
            background-color: #28a745;
            color: #ffffff;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 20px;
            font-size: 16px;
          }
          .btn:hover {
            background-color: #218838;
          }
          /* Responsive Design */
          @media only screen and (max-width: 600px) {
            table {
              width: 100%;
            }
            .email-header, .email-footer {
              padding: 10px;
            }
          }
        </style>
      </head>
      <body>
  
        <table>
          <!-- Header -->
          <tr>
            <td class="email-header">
              <h1>Notificación de uso de Servicio</h1>
            </td>
          </tr>
  
          <!-- Body -->
          <tr>
            <td>
              <p>Hola, ${firstName},</p>
              <br />
              <p>${message}</p>
              <br />
              <p>Si no has solicitado dicha información, por favor ignora este correo.</p>
            </td>
          </tr>
  
          <!-- Footer -->
          <tr>
            <td class="email-footer">
              <p>&copy; 2024 MyCompany. Todos los derechos reservados.</p>
              <p>Perú</p>
            </td>
          </tr>
        </table>
  
      </body>
      </html>
      `
  }

  async sendMail({ email, subject, firstName, message }: SendMailArgs) {
    try {
      const template = this.getTemplate({ firstName, message })

      const options = {
        from: `Notificaciones <${process.env.MAIL_USERNAME}>`,
        to: email,
        subject,
        text: '',
        html: template,
        replyTo: [
          "bramirezag@gmail.com"
        ]
      }

      const info = await transport.sendMail(options)

      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      throw error
    }
  }
}

export default new MailController()