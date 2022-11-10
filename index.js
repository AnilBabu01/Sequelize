const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const port = 8080;
require("./models");
var cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.send("Api is working on Port " + port);
});

app.listen(port, () => {
  console.log(`backend listening at http://localhost:${port}`);
});
