const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    imgage: { type: String },
    title: { type: String },
    content: { type: String },
    tags: { type: String },
    likes: [
      {
        email: { type: String },
        like: {
          type: Boolean,
        },
      },
    ],
    comments: [
      {
        email: {
          type: String,
        },
        comment: {
          type: String,
        },
      },
    ],
  },
  { collection: 'posts' }
);
module.exports = mongoose.model('PostModel', PostSchema);
