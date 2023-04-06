const router = require("express").Router();
// require controller
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// /api/users
router
  .route("/")
  .get(getUsers)
  .post(createUser)
  .put(updateUser)
  .delete(deleteUser);

router.route("/:userId").get(getSingleUser);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
