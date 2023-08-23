// Username, email, thoughts, friends
const mongoose = require('mongoose');

// Schema to create user model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: {
        type: string, 
        required: true,
        unique: true, 
        match: 
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ // Email regex, should catch most common email formats
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  });

// Gets the amount of friends
  userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });

// Initialize the model
const User = model('User', userSchema);

module.exports = User;