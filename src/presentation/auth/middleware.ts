import type { NextFunction, Request, Response } from "express"
import { JWT } from "../../utils"

export class AuthMiddleware {
  static validateJWT = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const auth = req.header("Authorization")

    if (!auth || !auth.startsWith("Bearer ")) return res.status(401).end()

    const token = auth.split(" ").at(1) ?? ""

    try {
      const payload = await JWT.decode(token)

      if (!payload) return res.status(401).end()

      req.body.payload = payload

      next()
    } catch (error) {
      console.error(error)

      return res.status(500).end()
    }
  }
}
