const { Schema, model } = require("mongoose");
const Mongoose = require("mongoose");
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: new Mongoose.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      max: 280,
      min: 1,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      date: {
        type: Date,
        default: Date.now,
        get: (time) => new Date(time).toLocaleString(),
      },
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Schema to create User model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max: 280,
      min: 1,
    },
    createdAt: {
      date: {
        type: Date,
        default: Date.now,
        get: (time) => new Date(time).toLocaleString(),
      },
      // trim: true,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `fullName` that gets and sets the user's full name
thoughtSchema
  .virtual("reactionCount")
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our User model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
