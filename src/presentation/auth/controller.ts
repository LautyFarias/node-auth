import type { Request, Response } from "express"
import { RegisterUserDTO } from "../../domain/dtos/auth"

export class AuthController {
  constructor() {

  }

  register = (req: Request, res: Response) => {
    const [dto, error] = RegisterUserDTO.create(req.body)

    if (error) {
      return res.status(400).json({ error })
    }

    res.json(dto)
  }

  login = (req: Request, res: Response) => {
    res.json("login")
  }
}