import { Router } from "express"
import { AuthRouter } from "./auth/routes"

export class AppRouter {
  static get routes() {
    const router = Router()

    router.use("/auth", AuthRouter.routes)

    return router
  }
}