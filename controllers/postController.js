const mongoose = require('mongoose');
const postModel = require('../models/PostModel');
const UserModel = require('../models/UserModel');

const getAllPosts = async (req, res) => {
  const allPosts = await postModel.find({});

  // const userId = allPosts.userId;
  // const userName = await UserModel.find({
  //   userId,
  // });
  // console.log(userName[0].gmail);
  res.json({
    allPosts,
  });
};

const getPostById = async (req, res) => {
  const withoutQuotesEmail = req.params.email.replaceAll('"', '');
  const postByID = await postModel.find({ email: withoutQuotesEmail });
  res.json({
    postByID,
  });
};
const addPost = async (req, res) => {
  console.log(req.body);

  const withoutQuotesEmail = req.body.email.replaceAll('"', '');
  const newPost = await postModel.create({
    email: withoutQuotesEmail,
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags,
  });
  res.send('added to db');
};

// add Comment to post
const addComment = async (req, res) => {
  const withoutQuotesEmail = req.body.email.replaceAll('"', '');
  let data = await postModel.findByIdAndUpdate(
    {
      _id: req.body.id,
    },
    {
      $push: {
        comments: { email: withoutQuotesEmail, comment: req.body.comment },
      },
    }
  );
  if (data) {
    res.send('ok');
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  addPost,
  addComment,
};
