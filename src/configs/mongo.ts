import mongoose from "mongoose"
import { MONGODB_URI } from "."

export const connectionMongo = mongoose.createConnection(MONGODB_URI)

connectionMongo.on('error', (err) => {
  console.error(`MongoDB connection error:`, err);
});

connectionMongo.once('open', () => {
  console.log(`MongoDB connection established.`);
});

connectionMongo.on('disconnected', () => {
  console.log(`MongoDB connection disconnected.`);
})