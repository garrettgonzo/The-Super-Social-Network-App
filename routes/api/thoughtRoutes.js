const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  updateSingleThought,
  deleteSingleThought,
  createThought,
  updateReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateSingleThought)
  .delete(deleteSingleThought);
// /api/applications/:applicationId/tags
// router.route("/:applicationId/tags").post(addTag);

// /api/applications/:applicationId/tags/:tagId
// router.route("/:applicationId/tags/:tagId").delete(removeTag);
router.route("/:thoughtId/reactions").put(updateReaction);

module.exports = router;

// {
// 	"updateReactionBody": "add",
// 	"reactionBody": "some text",
// 	"username": "username"
// }

// {
// 	"updateReactionBody": "delete",
// 	"reactionId": "65e259706a2b0f38b64fa25d"
// }

// use reaction ID rather than underscore id
