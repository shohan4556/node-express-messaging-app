import env from "dotenv";
import mongoose from "mongoose";

env.config();

export const initDB = () => {
  console.log("init databse");
  connectToDB();
};

export const createMessageModel = () => {
  const schema = new mongoose.Schema({
    username: String,
    message: String,
    time: {
      type: Date,
      default: Date.now
    }
  });

  //todo check if any name is null then insert a default value

  const messageModel = mongoose.model("message", schema);
  return messageModel;
};

const connectToDB = () => {
  const uri = process.env.MONGO_CONNECTION_URL;
  mongoose.connect(uri);

  mongoose.connection.on("connected", () => {
    console.log("connected to mongo!!!\n");
  });

  mongoose.connection.on("error", (error) => {
    console.log("error on connect !!!! \n", error);
    process.exit(1);
  });
};
