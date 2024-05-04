import type { Request, Response } from "express"
import { RegisterUserDTO } from "../../domain/dtos/auth"
import type { AuthRepository } from "../../domain/repositories/auth"

export class AuthController {
  constructor(private readonly repository: AuthRepository) { }

  register = (req: Request, res: Response) => {
    const [dto, error] = RegisterUserDTO.create(req.body)

    if (error) {
      return res.status(400).json({ error })
    }

    this.repository.register(dto)
      .then(user => res.json(user))
      .catch(error => res.status(500).json({ error }))
  }

  login = (req: Request, res: Response) => {
    res.json("login")
  }
}