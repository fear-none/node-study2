import express from "express";
import path from "path";
import mysql from "mysql";

const __dirname = path.resolve();

const app = express();

// body parser set
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// view engine setup
app.set("views", __dirname + "/views");
app.set("view engine", "pug");

// mysql connect
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "test",
});

// middleware
// GET home page
app.get("/", (req, res) => {
  res.render("main");
});

app.get("/write", (req, res) => {
  res.render("write");
});

app.post("/write", (req, res) => {
  // request 안에 있는 내용을 처리
  // request.body
  const title = req.body.title;
  const contents = req.body.contents;

  // mysql에 저장
  const sql = "INSERT INTO WRITINGS(TITLE, CONTENTS) VALUES(?, ?)";
  const params = [title, contents];
  connection.query(sql, params, function (error, results) {
    if (error) throw error;
    console.log("insert success");
    res.redirect("/detail");
    // res.redirect(`/detail/${results.insertId}`);
  });
});

app.get("/detail", (req, res) => {
  res.send("detail");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
