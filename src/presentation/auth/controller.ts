import type { Request, Response } from "express"
import { RegisterUserDTO } from "../../domain/dtos/auth"
import { HttpError } from "../../domain/errors/http"
import type { AuthRepository } from "../../domain/repositories/auth"
import { JWT } from "../../utils"

export class AuthController {
  constructor(private readonly repository: AuthRepository) {}

  private handlerError = (error: unknown, res: Response) => {
    if (error instanceof HttpError)
      return res.status(error.status).json({ error: error.message })

    console.error(error)

    return res.status(500).json({ error: "Internal server error" })
  }

  register = (req: Request, res: Response) => {
    const [dto, error] = RegisterUserDTO.create(req.body)

    if (error) {
      return res.status(400).json({ error })
    }

    this.repository
      .register(dto)
      .then(async (user) =>
        res.json({ user, token: await JWT.generate({ email: user.email }) }),
      )
      .catch((error) => this.handlerError(error, res))
  }

  login = (req: Request, res: Response) => {
    res.json("login")
  }
}
