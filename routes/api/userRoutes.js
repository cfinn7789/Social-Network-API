const router = require('express').Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/user-controller');

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.post("/:userId", updateUser);
router.delete("/:userId", deleteUser);

router.post("/:userId/friends/:friendId", addFriend);
router.delete("/:userId/friends/:friendId", deleteFriend);

module.exports = router;