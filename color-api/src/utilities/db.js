// imports
import mongoose from "mongoose";

// environment variables
const DB_SERVER_URI = process.env.DB_SERVER_URI;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_USER_PASSWORD = process.env.DB_USER_PASSWORD;

// env variables validation
if (!DB_SERVER_URI) {
  throw new Error("DB_URI env. variable is not set");
}

if (!DB_NAME) {
  throw new Error("DB_NAME env. variable is not set");
}

if (!DB_USER) {
  throw new Error("DB_USER env. variable is not set");
}

if (!DB_USER_PASSWORD) {
  throw new Error("DB_USER_PASSWORD env. variable is not set");
}

// code
function dbConnect() {
  return mongoose.connect(`${DB_SERVER_URI}/${DB_NAME}`, {
    user: DB_USER,
    pass: DB_USER_PASSWORD,
  });
}

// exports
export { dbConnect };
