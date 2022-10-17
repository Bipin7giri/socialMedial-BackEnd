const mongoose = require('mongoose');

const loginModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const register = async (req, res) => {
  console.log(req.body);

  const body = req.body;
  const emailFromDb = await loginModel.findOne({
    gmail: body.gmail,
  });
  if (body.gmail === emailFromDb?.gmail) {
    return res.send('Already exist');
  }
  const user = new loginModel(body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send('success');
};
const getAllUsers = async (req, res) => {
  if (req.params.email) {
    const withoutQuotesEmail = req.params.email.replaceAll('"', '');
    const allUsers = await loginModel.find({
      gmail: { $ne: withoutQuotesEmail },
    });
    res.send({
      allUsers,
    });
  } else {
    const allUsers = await loginModel.find({});
    res.send({
      allUsers,
    });
  }
};
const isLogin = async (req, res) => {
  const userEmail = await req.body.gmail;
  const userPassword = await req.body.password;
  const emailDb = await loginModel.findOne({
    gmail: userEmail,
  });

  if (emailDb) {
    bcrypt.compare(userPassword, emailDb.password, function (err, status) {
      if (status === true) {
        console.log('ok');
        res.send('matched');
      } else {
        res.send('not matched');
      }
    });
  } else {
    await res.send('not registered');
  }
};
// adding follower
const addFollower = async (req, res) => {
  const withoutQuotesEmail = req.body.authEmail.replaceAll('"', '');

  const followed = await loginModel.updateOne(
    { gmail: withoutQuotesEmail },
    { $push: { Following: req.body.followID } }
  );
  const follower = await loginModel.updateOne(
    { gmail: req.body.followID },
    { $push: { Followers: withoutQuotesEmail } }
  );
  if (followed && follower) {
    res.send('followed');
  }
};
const getFollowing = async (req, res) => {
  const withoutQuotesEmail = req.params.email.replaceAll('"', '');

  const { Following } = await loginModel?.findOne({
    gmail: withoutQuotesEmail,
  });

  if ({ Following }) {
    res.json({
      following: Following,
    });
  }
};
const showIfNotFollowed = async (req, res) => {
  const withoutQuotesEmail = req.params.email.replaceAll('"', '');

  const { Following } = await loginModel.findOne({
    gmail: withoutQuotesEmail,
  });
  console.log(Following);

  if ({ Following }) {
    res.json({
      following: Following,
    });
  }
};

// module.exports = { register };
module.exports = {
  register,
  getAllUsers,
  isLogin,
  addFollower,
  getFollowing,
  showIfNotFollowed,
};
