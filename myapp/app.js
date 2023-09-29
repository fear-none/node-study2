import express from "express";
import path from "path";

const __dirname = path.resolve();

const app = express();

// view engine setup
app.set("views", __dirname + "/views");
app.set("view engine", "pug");

// middleware
// GET home page
app.get("/", (req, res) => {
  res.send("home page");
});

app.get("/write", (req, res) => {
  res.render("write");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
