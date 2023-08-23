const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 300
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

// Schema for what makes up a thought
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 300,
  },
  createdAt: {
    type: Date,
    default: Date.now
    },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
});

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

// Initializes the model

const Thought = model('Thought', thoughtSchema);
const Reaction = model('Reaction', reactionSchema);

module.exports = { Thought, Reaction }
  