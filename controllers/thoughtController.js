const { Thought, User } = require("../models");

module.exports = {
  // Function to get all of the applications by invoking the find() method with no arguments.
  // Then we return the results as JSON, and catch any errors. Errors are sent as JSON with a message and a 500 status code
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Gets a single application using the findOneAndUpdate method. We pass in the ID of the application and then respond with it, or an error if not found
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Creates a new application. Accepts a request body with the entire Application object.
  // Because applications are associated with Users, we then update the User who created the app and add the ID of the application to the applications array
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "Thought created, but found no user with that ID",
        });
      }

      res.json("Created the thought 🎉");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async updateSingleThought(req, res) {
    console.log(req.body.thoughtText);
    const newThoughtText = req.body.thoughtText;
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: { thoughtText: newThoughtText } }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      const thought2 = await Thought.findOne({
        _id: req.params.thoughtId,
      });
      res.json(`updated the thought ${thought2} 🎉`);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteSingleThought(req, res) {
    try {
      const thoughtToDelete = await Thought.deleteOne({
        _id: req.params.thoughtId,
      });

      if (!thoughtToDelete) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json(`Deleted thought 🎉`);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async updateReaction(req, res) {
    // if adding req.body should look like { "updateReactionBody": "add", "reactionBody": "some text", "username": "username"}
    // if removing req.body should look like { "updateReactionBody": "delete", "reactionId": "lkj234h5kl23jh4213l"}
    try {
      const thoughtId = req.params.thoughtId;
      const updateReactionBody = req.body.updateReactionBody;

      if (updateReactionBody === "add") {
        const thought = await Thought.findOneAndUpdate(
          { _id: thoughtId },
          // { $set: { friends: [...friends, friendToAdd] } }
          { $push: { reactions: req.body } },
          { new: true }
        );
        if (!thought) {
          return res.status(404).json({ message: "No thought with that ID" });
        }
        res.json({ message: `updated the thought🎉`, thought });
      }
      if (updateReactionBody === "delete") {
        const thought = await Thought.findOneAndUpdate(
          { _id: thoughtId },
          // { $set: { friends: [...friends, friendToAdd] } }

          { $pull: { reactions: { reactionId: req.body.reactionId } } },
          { new: true }
        );
        if (!thought) {
          return res.status(404).json({ message: "No thought with that ID" });
        }

        res.json({ message: `deleted the reaction`, thought });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
