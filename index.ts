import mongoose from "mongoose";
import app from "./src/server";
import { MONGODB_URI, PORT } from "./src/configs";

const conectMongo = async () => {
  try {
      await mongoose.connect(MONGODB_URI);
      console.log('Connected to the database');
  } catch(error) {
      console.error(error);
  }
};

app.listen(PORT, async () => {
  console.log(`Server is running on PORT: ${PORT}`);
});