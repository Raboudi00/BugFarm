const mongoose = require("mongoose");

const bug = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "What are we calling the Bug"],
      trim: true,
    },
    user_id: { type: mongoose.Types.ObjectId },
    description: {
      type: String,
      required: [true, "A description is important"],
    },

    version: { type: String, required: [true, "The version is important"] },
    priority: { type: String, required: [true, "Select a priority level"] },
    assignee: {
      type: mongoose.Types.ObjectId,
      required: [true, "Choose an assignee"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bug", bug);
