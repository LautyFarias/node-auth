import { environment } from "./config"
import { Server } from "./presentation/server"

(() => {
  main()
})()

async function main() {
  new Server({ port: environment.PORT }).start()
}