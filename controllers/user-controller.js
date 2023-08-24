const User = require('../models/user');

exports.createUser = async (req, res) => {
    try {
      const { username, email } = req.body;
      // Create a new User document
      const user = new User({
        username,
        email
      });
      // Save the user to the database
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Could not create user' });
    }
  };
  
  // Get all Users
  exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Could not retrieve users' });
    }
  };
  
  // Get a single User by ID
  exports.getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Could not retrieve user' });
    }
  };
  
  // Update a User by ID
  exports.updateUser = async (req, res) => {
    try {
      const { username } = req.body;
      const user = await User.findByIdAndUpdate(req.params.userId, req.body,
        { username },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Could not update user' });
    }
  };
  
  // Delete a User by ID
  exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(204).send(); // No content, successful deletion
    } catch (error) {
      res.status(500).json({ error: 'Could not delete user' });
    }
  };

  exports.addFriend = async (req, res) => {
    try {
      const { friendId } = req.body;
      const userId = req.params.userId; // User ID to add a friend to
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const friend = await User.findById(friendId);
      if (!friend) {
        return res.status(404).json({ error: 'Friend not found' });
      }
      // Check if the friend is not already in the user's friend list
      if (!user.friends.includes(friendId)) {
        user.friends.push(friendId);
        await user.save();
        res.status(200).json(user);
      } else {
        res.status(400).json({ error: 'Friend already added' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Could not add friend' });
    }
  };
  
  // Delete a friend from a User's friend list
  exports.deleteFriend = async (req, res) => {
    try {
      const { friendId } = req.body;
      const userId = req.params.userId; // User ID to remove a friend from
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const friend = await User.findById(friendId);
      if (!friend) {
        return res.status(404).json({ error: 'Friend not found' });
      }
      // Check if the friend is in the user's friend list
      if (user.friends.includes(friendId)) {
        user.friends.pull(friendId);
        await user.save();
        res.status(200).json(user);
      } else {
        res.status(400).json({ error: 'Friend not found in the friend list' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Could not delete friend' });
    }
  };