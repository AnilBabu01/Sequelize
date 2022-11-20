const express = require("express");
const { createpost, getpostasuser } = require("../controllers/postControler");
const router = express.Router();

router.post("/createpost", createpost);
router.get("/getpost/:id", getpostasuser);
module.exports = router;
