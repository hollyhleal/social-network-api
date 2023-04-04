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
    default: Date.now,
    // TO DO: use a getter method to format the timestamp on the query
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

// TO DO: Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
