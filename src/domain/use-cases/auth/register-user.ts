import type { RegisterUserDTO } from "../../dtos/auth"
import { AuthRepository } from "../../repositories/auth"

interface UserToken {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

interface RegisterUserUseCase {
  execute(dto: RegisterUserDTO): Promise<UserToken>
}

export class RegisterUser implements RegisterUserUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(dto: RegisterUserDTO): Promise<UserToken> {
    const user = await this.authRepository.register(dto)

    return {
      token: "fake-token",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    }
  }
}
