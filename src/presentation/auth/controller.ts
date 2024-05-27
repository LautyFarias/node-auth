import type { Request, Response } from "express"
import { RegisterUserDTO } from "../../domain/dtos/auth"
import { HttpError } from "../../domain/errors/http"
import type { AuthRepository } from "../../domain/repositories/auth"
import { LoginUser, RegisterUser } from "../../domain/use-cases/auth"
import { jwt } from "../../utils"
import { LoginUserDTO } from "../../domain/dtos/auth/login.dto"

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

    new RegisterUser(this.repository, jwt.generate.bind(jwt))
      .execute(dto)
      .then((data) => res.json(data))
      .catch((error) => this.handlerError(error, res))
  }

  login = (req: Request, res: Response) => {
    const [dto, error] = LoginUserDTO.create(req.body)

    if (error) return res.status(400).json({ error })

    new LoginUser(this.repository, jwt.generate.bind(jwt))
      .execute(dto)
      .then((data) => res.json(data))
      .catch((error) => this.handlerError(error, res))
  }
}
