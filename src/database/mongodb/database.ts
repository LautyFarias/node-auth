import mongoose from "mongoose";

interface Options {
  url: string
  name: string
}

export class MongoDatabase {
  private url: string
  private name: string

  constructor(options: Options) {
    const { url, name } = options

    this.url = url
    this.name = name
  }

  async connect() {
    try {
      await mongoose.connect(this.url, {
        dbName: this.name
      })

      console.log("Mongo connected")

    } catch (error) {
      console.log("Mongo connection error")
      throw error
    }
  }
}