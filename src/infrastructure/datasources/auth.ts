import { UserModel } from "../../database/mongodb/models"
import { AuthDataSource as _AuthDataSource } from "../../domain/datasources/auth"
import type { RegisterUserDTO } from "../../domain/dtos/auth"
import { User } from "../../domain/entities/user"
import { HttpError } from "../../domain/errors/http"
import { UserMapper } from "../mappers/user"

type HashFunction = (password: string) => Promise<string>
type CompareFunction = (password: string, hash: string) => Promise<boolean>

export class AuthDataSource implements _AuthDataSource {
  constructor(
    private readonly hashPassword: HashFunction,
    private readonly comparePassword: CompareFunction,
  ) {}

  async register(dto: RegisterUserDTO): Promise<User> {
    const { name, email, password } = dto

    try {
      const exists = await UserModel.exists({ email })

      if (exists) throw HttpError.badRequest("User already exists")

      const user = await UserModel.create({
        name,
        email,
        password: await this.hashPassword(password),
      })

      await user.save()

      return UserMapper.userEntityFromObject(user)
    } catch (error) {
      if (error instanceof HttpError) throw error

      throw HttpError.internalServerError()
    }
  }
}
