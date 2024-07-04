import { Router } from "express";
import UserController from "../controllers/users"

const userRouter: Router = Router();

userRouter.post('/create', async (req, res) => {
  try {
    const { email, name } = req.body

    if(!email) throw new Error('email is missed')
    if (!name) throw new Error('name is missed')

    const user = await UserController.create({
      email, name
    })

    res.status(200)

    return res.json({
      data   : user,
      message: 'user created',
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

userRouter.put('/update', async (req, res) => {
  try {
    const { email, data } = req.body

    if(!email) throw new Error('email is missed')

    const user = await UserController.update({
      email, data
    })

    res.status(200)

    return res.json({
      data   : user,
      message: 'user updated',
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

userRouter.post('/delete', async (req, res) => {
  try {
    const { email } = req.body

    if(!email) throw new Error('email is missed')

    await UserController.delete({ email })

    res.status(200)

    return res.json({
      message: 'user deleted',
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

userRouter.get('/all', async (_, res) => {
  try {
    const users = await UserController.getUsers()

    res.status(200)

    return res.json({
      data: users,
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

export default userRouter;
