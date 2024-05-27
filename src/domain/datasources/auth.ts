import type { RegisterUserDTO, LoginUserDTO } from "../dtos/auth"
import type { User } from "../entities/user"

export abstract class AuthDataSource {
  abstract register(dto: RegisterUserDTO): Promise<User>
  abstract login(dto: LoginUserDTO): Promise<User>
}
