import { compare, genSalt, hash } from "bcryptjs"

export class Encryption {
  static async hash(password: string) {
    const salt = await genSalt()
    return await hash(password, salt)
  }

  static compare(password: string, hash: string) {
    return compare(password, hash)
  }
}
