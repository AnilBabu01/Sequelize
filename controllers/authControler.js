const db = require("../models");
const jwt = require("jsonwebtoken");
const { hash, genSalt, compare } = require("bcryptjs");

const JWT_SECRET = "anilbabu$oy";

const User = db.users;
//http://localhost:5000/api/auth/regster
exports.registerUser = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    if (!name) {
      res.status(401).json({ msg: "name required", success: false });
    }
    if (!email) {
      res.status(401).json({ msg: "email required", success: false });
    }
    if (!password) {
      res.status(401).json({ msg: "password required", success: false });
    }
    let user = await User.findOne({ where: { email: email } });

    if (user) {
      res
        .status(401)
        .json({ status: false, msg: "User Allready exist with email" });
    } else {
      const salt = await genSalt(10);
      const secPass = await hash(password, salt);
      user = await User.create({
        name: name,
        email: email,
        password: secPass,
      });
      const data = {
        user: {
          userid: user.userid,
        },
      };
      const token = jwt.sign(data, JWT_SECRET);

      res.status(200).json({
        status: true,
        token: token,
        msg: "Register  Successfully",
        user: user,
      });
    }
  } catch (error) {
    next(error);
  }
};
//http://localhost:5000/api/auth/login
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      res.status(401).json({ msg: "email required", success: false });
    }
    if (!password) {
      res.status(401).json({ msg: "password required", success: false });
    }
    let user = await User.findOne({ where: { email: email } });
    if (!user) {
      res.status(401).json({ status: false, msg: "User name not exists" });
    } else {
      const matchpassword = await compare(password, user.password);

      if (!matchpassword) {
        res.status(401).json({ status: false, msg: "User name not exists" });
      } else {
        const data = {
          user: {
            userid: user.userid,
          },
        };
        console.log(data);
        const token = jwt.sign(data, JWT_SECRET);

        res.status(200).json({
          status: true,
          token: token,
          msg: "Login  Successfully",
          user: user,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
//http://localhost:5000/api/auth/forgetpassword
exports.forgetpassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ where: { email: email } });
    if (!user) {
      res.status(401).json({ status: false, msg: "User Not Exist with mail" });
    } else {
      let otp = Math.floor(Math.random() * 10000);
      await User.update({ otp: otp }, { where: { email: email } });
      res
        .status(200)
        .json({ status: true, msg: "Pleace check your email", otp: otp });
    }
  } catch (error) {}
};
//http://localhost:5000/api/auth/resetpassword
exports.resetpassword = async (req, res, next) => {
  try {
    const { email, otp, password } = req.body;
    let user = await User.findOne({ where: { email: email } && { otp: otp } });
    if (!user) {
      res
        .status(401)
        .json({ status: false, msg: "Please check otp and email" });
    } else {
      const salt = await genSalt(10);
      const secPass = await hash(password, salt);
      await User.update(
        { password: secPass, otp: null },

        { where: { email: email } }
      );
      res
        .status(200)
        .json({ status: true, msg: "Password successfully updated" });
    }
  } catch (error) {}
};
//http://localhost:5000/api/auth/getAlluers?page=1&limit=4
exports.getusers = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit);
    const page = Number(req.query.page);

    const skip = (page - 1) * limit;
    console.log(typeof page);
    var users;

    if (req.query.limit && req.query.page) {
      users = await User.findAll({
        attributes: { exclude: ["password", "otp", "createdAt", "updatedAt"] },
        limit: limit,
        offset: skip,
      });
    } else {
      users = await User.findAll({
        attributes: { exclude: ["password", "otp", "createdAt", "updatedAt"] },
      });
    }
    if (!users) {
      res.status(401).json({ status: false, msg: "User name not exists" });
    }
    if (users) {
      res.status(200).json({
        status: true,
        page: page,
        length: users.length,
        msg: "Fetch All users Successfully",
        users: users,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
