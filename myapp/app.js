import express from "express";
import path from "path";
import mysql from "mysql";

const __dirname = path.resolve();

const app = express();

// view page source
app.locals.pretty = true;

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
  const sql = "SELECT * FROM WRITINGS";
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    res.render("main", { list: results });
  });
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
    res.redirect(`/detail/${results.insertId}`);
  });
});

app.get("/detail/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM WRITINGS WHERE ID = ?";
  connection.query(sql, id, function (error, results) {
    if (error) throw error;
    res.render("detail", { detail: results[0] });
  });
});

app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM WRITINGS WHERE ID = ?";
  connection.query(sql, id, function (error, results) {
    if (error) throw error;
    res.render("detail", { edit: results[0] });
  });
});

app.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const contents = req.body.contents;

  const sql = "UPDATE WRITINGS SET TITLE = ?, CONTENTS = ? WHERE id = ?";
  const params = [title, contents, id];
  connection.query(sql, params, function (error, results, fields) {
    if (error) throw error;
    console.log("update success");
    res.redirect(`/detail/${id}`);
  });
});

app.post("/delete/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM WRITINGS WHERE ID = ?";
  connection.query(sql, id, function (error, results) {
    if (error) throw error;
    console.log("delete success");
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
