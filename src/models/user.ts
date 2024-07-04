import { Schema } from "mongoose";
import { connectionMongo } from "../configs/mongo";

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, trim: true }, 
  deleted: { type: Boolean, default: false }
}, { timestamps: true })

const UserModel = connectionMongo.model('user', UserSchema)

export default UserModel