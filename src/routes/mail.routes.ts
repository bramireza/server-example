import { Router } from "express";
import mailController from "../controllers/mail"

const mailRouter: Router = Router();

mailRouter.post('/send', async (req, res) => {
  try {
    const { email, firstName, subject, message } = req.body

    if(!email) throw new Error('email is missed')
    if(!firstName) throw new Error('firstName is missed')
    if(!subject) throw new Error('subject is missed')
    if(!message) throw new Error('message is missed')

    await mailController.sendMail({
      email,
      subject,
      firstName,
      message
    })

    res.status(200)

    return res.json({
      success: true
    })
  } catch (error: any) {
    res.status(500)

    return res.json({
      data      : null,
      error     : true,
      message: error.message,
      success   : false
    })
  }
})

export default mailRouter;
