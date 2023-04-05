const { Schema, Types } = require("mongoose");

// Schema to create Thought model
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    min: 1,
    max: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    // TO DO: use a getter method to format the timestamp on the query
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

// Virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Schema named "reactionSchema" for subdocument
const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    max: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    // TO DO: use a getter method to format the timestamp on the query
  },
});

module.exports = thoughtSchema;
