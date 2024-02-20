const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  updateSingleThought,
  deleteSingleThought,
  createThought,
  addTag,
  removeTag,
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

module.exports = router;
