import { Router } from "express"
import UserRouter from "./user.routes"

const mainRouter: Router = Router()

mainRouter.use('/user', UserRouter)

export default mainRouter