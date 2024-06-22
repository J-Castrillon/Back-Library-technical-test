import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

dotenv.config();

const dbConnect = async () => {
  try {
    const database = `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`;
    await mongoose.connect(database);

    console.log(colors.yellow("Database connected"));
  } catch (error) {
    console.log(colors.red("Database error"));
  }
};

export default dbConnect;