import express, { type Router } from "express"

interface Options {
  port?: number
  router: Router
}

const DEFAULT_PORT = 3000

export class Server {
  public readonly app = express()
  private readonly port: number
  private readonly router: Router

  constructor(options: Options) {
    const { port = DEFAULT_PORT, router } = options

    this.port = port
    this.router = router
  }

  async start() {
    this.app.use(express.json())

    this.app.use(this.router)

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}