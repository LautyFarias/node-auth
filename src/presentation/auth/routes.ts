import { Router } from "express"

export class AuthRouter {
  static get routes() {
    const router = Router()

    router.post("/login", (req, res) => {
      res.json("login")
    })
    router.post("/register", (req, res) => {
      res.json("register")
    })

    return router
  }
}