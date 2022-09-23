const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const hostname = "127.0.0.1";
let cors = require("cors");
app.use(cors());
const userRoutes = require("./routers/userRouter");
const postRoutes = require("./routers/postRouter");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");

const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

app.use(cookieParser());

const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/socialmedia";
const connect = async () => {
  try {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("connected to mongodb");
  } catch (error) {
    console.error(error);
  }
};
app.use("/auth", userRoutes);
connect();
app.use("/posts", postRoutes);

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}`);
  console.log(`Example app listening on port ${port}`);
});
