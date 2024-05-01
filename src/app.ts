import { environment } from "./config"
import { AppRouter } from "./presentation/routes"
import { Server } from "./presentation/server"

(() => {
  main()
})()

async function main() {
  new Server({ port: environment.PORT, router: AppRouter.routes }).start()
}