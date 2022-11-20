const db = require("../models");

const Posts = db.posts;
const Users = db.users;
exports.createpost = async (req, res) => {
  const post = await Posts.create({
    comment: req.body.comment,
    userid: req.body.userid,
  });

  res.json({ sataus: true, post: post, msg: "user register successfully" });
};

exports.getpostasuser = async (req, res) => {
  const data = await Users.findAll({
    attributes: ["name"],
    include: [
      {
        model: Posts,
        attributes: [["comment", "postname"]],
      },
    ],
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json(data);
};
