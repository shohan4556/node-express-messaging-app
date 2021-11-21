import express from "express";
import morgan from "morgan";
import buffer from "nanobuffer";
import path from "path";
import { initDB, createMessageModel } from "./database.js";
const __dirname = path.resolve();
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//connect to mongodb atlas
const db = await initDB();
const messageModel = await createMessageModel();

//console.log("model\n", messageModel);

//50 message
const msg = [];
msg.push({
  user: "shohan",
  text: "hello world",
  time: Date.now()
});
const getMsgs = () => Array.from(msg).reverse();

app.get("/", (req, res, next) => {
  //res.send("Hello Shohan !").status(200);
  //res.send("index.html");
  res.sendfile("/index.html");
});

app.get("/poll", async (req, res, next) => {
  msg.length = 0;
  try {
    const result = (await messageModel.find()).forEach((item) => {
      msg.push({
        user: item.username,
        text: item.message,
        time: item.time
      });
    });
  } catch (e) {
    console.log("error on getting data from mongodb atlas");
  }
  //console.log("result\n", msg);

  res.status(200).json({
    msg: Array.from(msg).reverse()
  });
});

app.post("/poll", async (req, res, next) => {
  const { user, text } = req.body;

  //save the data to buffer
  msg.push({
    user,
    text,
    time: Date.now()
  });

  //insert the data to db
  try {
    const result = await messageModel.create(
      { username: user, message: text },
      (err) => {
        if (err) console.log("failed to save data\n", err);
        else console.log("data saved success!!\n");
      }
    );
  } catch (e) {
    console.log("error on saving data on mongo atlas");
  }

  res.status(200).json({ msg: "success", status: 200 });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
