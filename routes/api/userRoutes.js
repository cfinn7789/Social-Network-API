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
router.get("/:id", getUserById);
router.post("/:id", updateUser);
router.delete("/:id", deleteUser);

router.post("/:userId/friends/:friendId", addFriend);
router.delete("/:userId/friends/:friendId", deleteFriend);

module.exports = router;