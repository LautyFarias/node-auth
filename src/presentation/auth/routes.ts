import { Router } from "express"
import { AuthController } from "./controller"

export class AuthRouter {
  static get routes() {
    const router = Router()
    const controller = new AuthController()

    router.post("/login", controller.login)
    router.post("/register", controller.register)

    return router
  }
}