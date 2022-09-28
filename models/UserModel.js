const mongoose = require('mongoose');
const opts = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, require: true },
    middleName: { type: String, require: false },
    lastName: { type: String, require: true },
    gmail: { type: String, unique: true },
    password: { type: String, require: true },
    Followers: [],
    Following: [],
    posts: [],
  },
  opts
  // { collection: 'users' }
);
// const ProductModel = mongoose.model("ProductModel", ProductSchema);
module.exports = mongoose.model('User', UserSchema);
