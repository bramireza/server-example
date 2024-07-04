import mongoose from "mongoose"
import { MONGODB_URI } from "."

export const connectionMongo = mongoose.createConnection(MONGODB_URI)