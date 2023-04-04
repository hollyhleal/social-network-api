const { Schema, model } = require("mongoose");
const thoughtSchema = require("./Thought");

// Schema to create User model
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  thoughts: [thoughtSchema],
  friends: [userSchema],
});

// TO DO: Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

const User = model("user", userSchema);

module.exports = User;
