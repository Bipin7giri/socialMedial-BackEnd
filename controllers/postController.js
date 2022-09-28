const mongoose = require('mongoose');
const postModel = require('../models/PostModel');
const UserModel = require('../models/UserModel');

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
    tags: '#' + req.body.tags,
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
  if (data) {
    res.send('ok');
  }
};
// const addLike = async (req, res) => {
//   // if (req.body.id === true) {

//   //  }
//   const withoutQuotesEmail = req.body.email.replaceAll('"', '');

//   const { likes } = await postModel.findById({ _id: req.body.id });

//   const check = likes.map((item) => {
//     if (item.email === withoutQuotesEmail) {
//       return true;
//     } else {
//       return false;
//     }
//   });
//   console.log(check);

//   if (check[0] === true) {
//     const data = await postModel.findByIdAndUpdate(
//       { _id: req.body.id },
//       {
//         $set: {
//           likes: { email: withoutQuotesEmail, like: false },
//         },
//       }
//     );
//     if (data) {
//       res.json({
//         status: false,
//         postId: req.body.id,
//       });
//     }
//   } else if (check[0] === null || check[0] === false) {
//     const data = await postModel.findByIdAndUpdate(
//       { _id: req.body.id },
//       {
//         $set: {
//           likes: { email: withoutQuotesEmail, like: true },
//         },
//       }
//     );
//     if (data) {
//       res.json({
//         status: true,
//         postId: req.body.id,
//       });
//     }
//   } else if (check[0] === undefined) {
//     const data = await postModel.findByIdAndUpdate(
//       { _id: req.body.id },
//       {
//         $push: {
//           likes: { email: withoutQuotesEmail, like: false },
//         },
//       }
//     );
//     if (data) {
//       res.json({
//         status: false,
//         postId: req.body.id,
//       });
//     }
//   }
// };
module.exports = {
  getAllPosts,
  getPostById,
  addPost,
  addComment,
  // addLike,
};
