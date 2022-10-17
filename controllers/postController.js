const mongoose = require('mongoose');
const postModel = require('../models/PostModel');
const UserModel = require('../models/UserModel');
const NotificationModel = require('../models/NotificationModel');
const PostModel = require('../models/PostModel');
const { find } = require('../models/PostModel');
const { post } = require('../routers/postRouter');
const getAllPosts = async (req, res) => {
  const allPosts = await postModel.find({});
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
  const withoutQuotesEmail = req.body.email.replaceAll('"', '');
  const userId = await UserModel.find({ gmail: withoutQuotesEmail });
  console.log(userId[0].gmail);
  const newPost = await postModel.create({
    email: withoutQuotesEmail,
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags,
    posts: withoutQuotesEmail,
  });

  res.send('added to db');
};

// add Comment to post
const addComment = async (req, res) => {
  const withoutQuotesEmail = req.body.email.replaceAll('"', '');
  const data = await postModel.findByIdAndUpdate(
    {
      _id: req.body.id,
    },
    {
      $push: {
        comments: { email: withoutQuotesEmail, comment: req.body.comment },
      },
    }
  );

  const notification = await NotificationModel.create({
    content: `${withoutQuotesEmail} has commented: ${req.body.comment} `,
    post: data._id,
  });
  console.log(notification);
  const notificationID = await PostModel.findByIdAndUpdate(
    { _id: data._id },
    {
      $push: { notification: notification },
    }
  );
  if (notification) {
    res.json({
      message: 'notification saved',
    });
  }
};

const addLike = async (req, res) => {
  const withoutQuotesEmail = req.body.email.replaceAll('"', '');
  const { likes, _id } = await postModel.findById({ _id: req.body.id });
  const check = likes.filter((item) => {
    if (item.email === withoutQuotesEmail) {
      return item;
    }
  });

  if (check.length === 0) {
    const data = await postModel.findByIdAndUpdate(
      { _id: req.body.id, 'likes.email': withoutQuotesEmail },
      {
        $push: {
          likes: { email: withoutQuotesEmail, like: true },
        },
      }
    );
    if (data) {
      res.json({
        status: true,
        // postId: req.body.id,
      });
    }
  } else {
    console.log('down');
    const data = await postModel.updateOne(
      { _id: req.body.id, 'likes.email': withoutQuotesEmail },
      { $pull: { likes: { email: withoutQuotesEmail, like: true } } },
      { multi: true }
    );
    if (data) {
      res.json({
        status: true,
        // postId: req.body.id,
      });
    }
  }

  const notification = await NotificationModel.create({
    content: `${withoutQuotesEmail} has liked your post`,
    post: _id,
  });
  const notificationID = await PostModel.findByIdAndUpdate(
    { _id: _id },
    {
      notification: notification._id,
    }
  );
};
const getNotification = async (req, res) => {
  const email = req.params.email;
  let finalNotification = [];

  const data = await PostModel.find({ email: email }).populate('notification');
  console.log(data);
  res.json({
    notification: data,
  });

  return;
  const notificationId = data.map((item, index) => {
    return item.notification;
  });
  const concatNotificationId = Array.prototype.concat(...notificationId);
  console.log(concatNotificationId);
  let arr = [];
  const getNotification = concatNotificationId.map((item, id) => {
    arr = [];
    NotificationModel.find({ post: item }).then((data) => {
      // console.log(data);
      arr = [...[data]];
    });
  });
  console.log(arr);
  // const concatNotification = Array.prototype.concat(...arr);
  // console.log(concatNotification);
  // console.log(getNotification);
  res.json({
    notification: 'r',
  });
  // // console.log(notification);
  // const datas = PostModel.find({ email: email }).exec((err, user) => {
  //   const notificationId = user.map((item, id) => {
  //     return item.notification;
  //   });
  //   console.log(notificationId);
  //   const notification = notificationId.map((item) => {
  //     console.log(item.toString());

  //     const notification = NotificationModel.find({
  //       post: item,
  //     }).exec((err, notify) => {
  //       finalNotification = notify;
  //       // console.log(getNotificationWithPost);
  //     });
  //   });
  // });
  // console.log(finalNotification);
};

module.exports = {
  getAllPosts,
  getPostById,
  addPost,
  addComment,
  addLike,
  getNotification,
};
