import express from "express";
import path from "path";

const __dirname = path.resolve();

const app = express();

// body parser set
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// view engine setup
app.set("views", __dirname + "/views");
app.set("view engine", "pug");

// middleware
// GET home page
app.get("/", (req, res) => {
  res.render("main");
});

app.get("/write", (req, res) => {
  res.render("write");
});

app.post("/write", (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;

  res.render("detail", {});
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
