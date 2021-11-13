import express from "express";
import morgan from "morgan";
import buffer from "nanobuffer";
import path from "path";
const __dirname = path.resolve();
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/src/public"));

//50 message
const msg = new buffer(50);
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

app.get("/poll", (req, res, next) => {
  res.status(200).json({
    msg: getMsgs()
  });
});

app.post("/poll", (req, res, next) => {
  const { user, text } = req.body;
  msg.push({
    user,
    text,
    time: Date.now()
  });
  res.status(200).json({ msg: "success", status: 200 });
});

const PORT = 8080 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
