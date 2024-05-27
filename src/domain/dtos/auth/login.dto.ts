import { Result } from "../../../types"
import { RegEx } from "../../../utils"

export class LoginUserDTO {
  private constructor(
    public email: string,
    public password: string,
  ) {}

  static create(object: { [key: string]: any }): Result<LoginUserDTO, String> {
    const { email, password } = object

    if (!email) return [undefined, "Missing email"]
    if (!RegEx.email.test(email)) return [undefined, "Invalid email"]

    if (!password) return [undefined, "Missing password"]
    if (typeof password !== "string" || password.length < 6)
      [undefined, "Invalid password"]

    return [new LoginUserDTO(email as string, String(password)), undefined]
  }
}
