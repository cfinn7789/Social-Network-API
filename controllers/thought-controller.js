const Thought = require('../models/thought');

// Create thought
exports.createThought = async (req, res) => {
    try {
      const { thoughtText, userId, username } = req.body;
      const thought = new Thought({
        thoughtText,
        user: userId,
        username,
      });
      await thought.save();
      res.status(201).json(thought);
    } catch (error) {
      res.status(500).json({ error: 'Could not create thought' });
    }
  };

  // Get all thoughts
exports.getAllThoughts = async (req, res) => {
    try {
      const thoughts = await Thought.find({})
      res.status(200).json(thoughts);
    } catch (error) {
      res.status(500).json({ error: 'Could not retrieve thoughts' });
    }
  };
  
  // Get a single Thought by ID
  exports.getThoughtById = async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.status(200).json(thought);
    } catch (error) {
      res.status(500).json({ error: 'Could not retrieve thought' });
    }
  };

  exports.updateThought = async (req, res) => {
    try {
      const { content } = req.body;
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { content },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.status(200).json(thought);
    } catch (error) {
      res.status(500).json({ error: 'Could not update thought' });
    }
  };

  exports.deleteThought = async (req, res) => {
    try {
      const thought = await Thought.findByIdAndRemove(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Could not delete thought' });
    }
  };

  exports.createReaction = async (req, res) => {
    try {
      const { thoughtId, reactionText, userId } = req.body;
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      thought.reactions.push({
        reactionText,
        user: userId,
        username,
      });
      await thought.save();
      res.status(201).json(thought);
    } catch (error) {
      res.status(500).json({ error: 'Could not create reaction' });
    }
};

// Delete a reaction from a thought
exports.deleteReaction = async (req, res) => {
    try {
      const { thoughtId, reactionId } = req.params;
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      const reactionIndex = thought.reactions.findIndex(
        (reaction) => reaction._id.toString() === reactionId
      );
      if (reactionIndex === -1) {
        return res.status(404).json({ error: 'Reaction not found' });
      }
      thought.reactions.splice(reactionIndex, 1);
      await thought.save();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Could not delete reaction' });
    }
};