import jwt from "jsonwebtoken"

interface Options {
  expiration: string
}

export class JWT {
  static async generate(payload: Object, options: Options = { expiration: "2h" }) {
    const { expiration: expiresIn } = options

    return new Promise<string | null>(resolve => {
      jwt.sign(payload, "SEED", { expiresIn }, (err, token) => {
        if (err) return resolve(null)

        return resolve(token!)
      })
    })
  }
}