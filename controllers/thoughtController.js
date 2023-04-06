// TO DO: require in mongoose?
const { User, Thought } = require("../models");

module.exports = {
  // GET all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // GET a single thought by its _id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found under that id." })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // POST a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err))
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Thought created, but user not found.",
            })
          : res.json({ message: "Thought added to user's thoughts." })
      );
  },

  // PUT to update a thought by its _id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this id." })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // DELETE to remove a thought by its _id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this id." })
          : res.json({ message: "Thought has been deleted." })
      )
      .catch((err) => res.status(500).json(err));
  },

  // POST to create a reaction stored in a single thought's reactions array field
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this id." })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // DELETE to pull and remove a reaction by the reaction's reactionId value
  deleteReaction(req, res) {
    Thought.findOneAndDelete(
      { _id: req.params.thoughtId },
      { reactions: { reactionId: req.params.reactionId } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this id." })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
