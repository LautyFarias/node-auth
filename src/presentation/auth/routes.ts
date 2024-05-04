import { Router } from "express"
import { AuthDataSource } from "../../infrastructure/datasources/auth"
import { AuthRepository } from "../../infrastructure/repositories/auth"
import { AuthController } from "./controller"

export class AuthRouter {
  static get routes() {
    const router = Router()

    const datasource = new AuthDataSource()
    const repository = new AuthRepository(datasource)

    const controller = new AuthController(repository)

    router.post("/login", controller.login)
    router.post("/register", controller.register)

    return router
  }
}