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

const user = require("./routes/user");
const post = require("./routes/post");
app.use("/api/auth", user);
app.use("/api", post);
app.listen(port, () => {
  console.log(`backend listening at http://localhost:${port}`);
});
