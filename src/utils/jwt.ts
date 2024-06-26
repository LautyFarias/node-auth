import jwtlib from "jsonwebtoken"
import { environment } from "../config"

interface Options {
  expiration: string
}

export type generateMethod = (
  payload: Object,
  options?: Options,
) => Promise<string>

class JWT {
  constructor(private readonly seed: string) {}

  async generate(payload: Object, options: Options = { expiration: "2h" }) {
    const { expiration: expiresIn } = options

    return new Promise<string>((resolve, reject) => {
      jwtlib.sign(payload, this.seed, { expiresIn }, (err, token) => {
        if (err) return reject(err)

        return resolve(token!)
      })
    })
  }

  async decode<T extends { [key: string]: any }>(token: string) {
    return new Promise<T | null>((resolve) => {
      jwtlib.verify(token, this.seed, (err, decoded) => {
        if (err) resolve(null)

        resolve(decoded as T)
      })
    })
  }
}

export const jwt = new JWT(environment.SECRET_KEY)
