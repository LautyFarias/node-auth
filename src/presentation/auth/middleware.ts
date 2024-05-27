import type { NextFunction, Request, Response } from "express"

export class AuthMiddleware {
  static validateJWT = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.header("Authorization")

    if (!auth || !auth.startsWith("Bearer ")) return res.status(401).end()

    const token = auth.split(" ").at(1) ?? ""

    try {
      // const payload = JWT

      req.body.token = token

      console.log(req.body) // token should be in body

      next()
    } catch (error) {
      console.error(error)

      return res.status(500).end()
    }
  }
}
