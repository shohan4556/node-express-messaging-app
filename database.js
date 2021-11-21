import env from "dotenv";
env.config();
import mongoose from "mongoose";

export const initDB = () => {
  console.log("init databse");
  connectToDB();
};

const connectToDB = () => {
  const uri = process.env.MONGO_CONNECTION_URL;

  mongoose.connect(uri);

  mongoose.connection.on("connected", () => {
    console.log("connected to mongo!");
  });

  mongoose.connection.on("error", (error) => {
    console.log("error on connect !!!! \n", error);
    process.exit(1);
  });
};

// let database = {
//   initDB
// };

// module.exports = { database };

// const { MongoClient } = require("mongodb");
// const uri =
//   "mongodb+srv://shohan:<password>@cluster0.k4qrc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
