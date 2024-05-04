import { AuthDataSource as _AuthDataSource } from "../../domain/datasources/auth";
import type { RegisterUserDTO } from "../../domain/dtos/auth";
import { User } from "../../domain/entities/user";
import { HttpError } from "../../domain/errors/http";

export class AuthDataSource implements _AuthDataSource {
  async register(dto: RegisterUserDTO): Promise<User> {

    const { name, email, password } = dto

    try {

      return new User({ id: "1", email, name, password, roles: ["ADMIN"] })

    } catch (error) {
      if (error instanceof HttpError) throw error

      throw HttpError.internalServerError()
    }

  }

}
