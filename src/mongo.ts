import mongoose from "mongoose";
import { Database } from "../@types/bot";

class MongoDb implements Database {
  db: mongoose.Connection;
  constructor(uri: string) {
    mongoose.connect(uri, { keepAlive: true });
    this.db = mongoose.connection;
    this.db.on("error", console.error.bind(console, "connection error: "));
    this.db.once("open", function () {
      console.log("Connected to MongoDb successfully");
    });
  }
}
export default MongoDb;
