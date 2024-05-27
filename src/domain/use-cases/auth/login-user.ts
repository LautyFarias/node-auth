import type { generateMethod } from "../../../utils/jwt"
import type { LoginUserDTO } from "../../dtos/auth"
import { HttpError } from "../../errors/http"
import { AuthRepository } from "../../repositories/auth"

interface UserToken {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

interface LoginUserUseCase {
  execute(dto: LoginUserDTO): Promise<UserToken>
}

export class LoginUser implements LoginUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly generateToken: generateMethod,
  ) {}

  async execute(dto: LoginUserDTO): Promise<UserToken> {
    const user = await this.authRepository.login(dto)

    const token = await this.generateToken({ id: user.id }).catch((err) => {
      console.error("Token isn't created due to", err)

      throw HttpError.internalServerError()
    })

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    }
  }
}
