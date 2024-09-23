import { Router } from "express"
import UserRouter from "./user.routes"
import MailRouter from "./mail.routes"

const mainRouter: Router = Router()

mainRouter.use('/user', UserRouter)
mainRouter.use('/mail', MailRouter)

export default mainRouter