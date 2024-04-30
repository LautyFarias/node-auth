import express from "express"

interface Options {
  port?: number
}

const DEFAULT_PORT = 3000

export class Server {
  public readonly app = express()
  private readonly port: number

  constructor(options: Options) {
    const { port = DEFAULT_PORT } = options

    this.port = port
  }

  async start() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}