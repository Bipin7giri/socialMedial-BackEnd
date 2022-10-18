const mongoose = require('mongoose');
const opts = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};
const PostSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    imgage: { type: String },
    title: { type: String },
    content: { type: String },
    tags: { type: String },
    notification: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Notifications' },
    ],
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
  opts

  // { collection: 'posts' }
);
module.exports = mongoose.model('Posts', PostSchema);
