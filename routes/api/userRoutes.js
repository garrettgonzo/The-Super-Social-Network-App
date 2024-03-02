const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteSingleUser,
  updateSingleUser,
  updateFriend,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router
  .route("/:userId")
  .get(getSingleUser)
  .delete(deleteSingleUser)
  .put(updateSingleUser);

// router.route("/:userId/friends/:friendId").put(addFriend);
router.route("/:userId/friends/:friendId").put(updateFriend);
module.exports = router;
