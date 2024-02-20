const { User, Application } = require("../models");

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find().populate("thoughts").populate("friends");
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    console.log(req.body);
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateSingleUser(req, res) {
    const newUserNameText = req.body.username;
    const newUserEmailText = req.body.email;
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: { username: newUserNameText, email: newUserEmailText } }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      const newUserNameText2 = await User.findOne({
        _id: req.params.userId,
      });
      res.json(`updated the user ${newUserNameText2}🎉`);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Delete a user and associated apps
  async deleteSingleUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json({ message: "User deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
