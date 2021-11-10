const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, unique: true },
  password: { type: String },
  myBlogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blog",
    },
  ],
  token: { type: String, default: "" },
  tags: [
    {
      type: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
