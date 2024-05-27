import type { NextFunction, Request, Response } from "express"
import { JWT } from "../../utils"
import { UserModel } from "../../database/mongodb/models"

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
      const payload = await JWT.decode<{ id: string }>(token)

      if (!payload) return res.status(401).end()

      const user = await UserModel.findById(payload.id)

      if (!user) return res.status(401).end()

      req.body.user = user

      next()
    } catch (error) {
      console.error(error)

      return res.status(500).end()
    }
  }
}
