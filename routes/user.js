const express = require("express");
const {
  registerUser,
  loginUser,
  forgetpassword,
  resetpassword,
  getusers,
} = require("../controllers/authControler");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgetpassword", forgetpassword);
router.get("/resetpassword", resetpassword);
router.get("/getAlluers", getusers);

module.exports = router;
