const router = require('express').Router();
const {
  createThought,
  getAllThoughts,
  getThoughtById,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thought-controller.js');

router.post('/', createThought);
router.get('/', getAllThoughts);
router.get('/:thoughtId', getThoughtById);
router.put('/:thoughtId', updateThought);
router.delete('/:thoughtId', deleteThought);

router.post('/:thoughtId/reactions', createReaction);
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;