import { Result } from "../../../types"
import { RegEx } from "../../../utils"

export class RegisterUserDTO {
  private constructor(
    public name: string,
    public email: string,
    public password: string,
  ) {}

  static create(object: {
    [key: string]: any
  }): Result<RegisterUserDTO, String> {
    const { name, email, password } = object

    if (!name) return [undefined, "Missing name"]
    if (typeof name !== "string") [undefined, "Invalid name"]

    if (!email) return [undefined, "Missing email"]
    if (!RegEx.email.test(email)) return [undefined, "Invalid email"]

    if (!password) return [undefined, "Missing password"]
    if (typeof password !== "string" || password.length < 6)
      [undefined, "Invalid password"]

    return [
      new RegisterUserDTO(name as string, email as string, String(password)),
      undefined,
    ]
  }
}
