import { AuthDataSource } from "../../domain/datasources/auth"
import type { LoginUserDTO, RegisterUserDTO } from "../../domain/dtos/auth"
import type { User } from "../../domain/entities/user"
import { AuthRepository as _AuthRepository } from "../../domain/repositories/auth"

export class AuthRepository implements _AuthRepository {
  constructor(private readonly datasource: AuthDataSource) {}

  login(dto: LoginUserDTO): Promise<User> {
    return this.datasource.login(dto)
  }

  register(dto: RegisterUserDTO): Promise<User> {
    return this.datasource.register(dto)
  }
}
