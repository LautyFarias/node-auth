import { environment } from "./config"
import { MongoDatabase } from "./database/mongodb"
import { AppRouter } from "./presentation/routes"
import { Server } from "./presentation/server"

(() => {
  main()
})()

async function main() {
  await new MongoDatabase({ url: environment.MONGO_URL, name: environment.MONGO_DB_NAME }).connect()

  new Server({ port: environment.PORT, router: AppRouter.routes }).start()
}