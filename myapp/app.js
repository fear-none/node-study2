import express from "express";

const app = express();

// middleware
// GET home page
app.get("/", (req, res) => {
  res.send("home page");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
