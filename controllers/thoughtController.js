const { Thought, User } = require("../models");

const thoughtController = {
  // Retrieve all thoughts from the database
  async getThoughts(req, res) {
    try {
      const dbThoughtData = await Thought.find().sort({ createdAt: -1 });
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Retrieve a specific thought by its ID
  async getSingleThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOne({
        _id: req.params.thoughtId,
      });

      if (!dbThoughtData) {
        return res
          .status(404)
          .json({ message: "No thought found with this ID!" });
      }

      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Create a new thought and associate it with a user
  async createThought(req, res) {
    try {
      // Create the new thought
      const newThought = await Thought.create(req.body);

      // Find the user who should be associated with this thought
      const user = await User.findOneAndUpdate(
        { username: req.body.username }, // Assuming you're using username
        { $push: { thoughts: newThought._id } }, // Add the thought ID to the user's thoughts array
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "Thought created, but no matching user found!" });
      }

      res.json(newThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Update an existing thought by its ID
  async updateThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!dbThoughtData) {
        return res
          .status(404)
          .json({ message: "No thought found with this ID!" });
      }

      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Delete a thought by its ID and update the user's thoughts list
  async deleteThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });

      if (!dbThoughtData) {
        return res
          .status(404)
          .json({ message: "No thought found with this ID!" });
      }

      const dbUserData = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!dbUserData) {
        return res
          .status(404)
          .json({ message: "Thought deleted but user not found!" });
      }

      res.json({ message: "Thought successfully deleted!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add a reaction to a thought
  async addReaction(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!dbThoughtData) {
        return res
          .status(404)
          .json({ message: "No thought found with this ID!" });
      }

      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Remove a specific reaction from a thought
  async removeReaction(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!dbThoughtData) {
        return res
          .status(404)
          .json({ message: "No thought found with this ID!" });
      }

      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;
