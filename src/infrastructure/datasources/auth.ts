import { UserModel } from "../../database/mongodb/models";
import { AuthDataSource as _AuthDataSource } from "../../domain/datasources/auth";
import type { RegisterUserDTO } from "../../domain/dtos/auth";
import { User } from "../../domain/entities/user";
import { HttpError } from "../../domain/errors/http";

export class AuthDataSource implements _AuthDataSource {
  async register(dto: RegisterUserDTO): Promise<User> {

    const { name, email, password } = dto

    try {

      const exists = await UserModel.exists({ email })

      if (exists) throw HttpError.badRequest("User already exists")

      const user = await UserModel.create({ name, email, password })

      await user.save()

      return new User({ id: user.id, email, name, password, roles: user.roles })

    } catch (error) {
      if (error instanceof HttpError) throw error

      throw HttpError.internalServerError()
    }

  }

}
