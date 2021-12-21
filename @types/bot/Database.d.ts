import mongoose from "mongoose";
export interface Database {
  db: mongoose.Connection;
}
