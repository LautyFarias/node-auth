import type { Response, Request } from "express"

export class AuthController {
  constructor() {

  }

  register = (req: Request, res: Response) => {
    res.json("register")
  }

  login = (req: Request, res: Response) => {
    res.json("login")
  }
}