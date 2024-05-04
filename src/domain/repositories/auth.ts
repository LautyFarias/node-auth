import type { RegisterUserDTO } from "../dtos/auth";
import type { User } from "../entities/user";

export abstract class AuthRepository {
  abstract register(dto: RegisterUserDTO): Promise<User>
}
