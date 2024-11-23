const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['Work', 'Personal', 'Others'],
      default: 'Others',
    },
    completed: {
        type: Boolean,
        default: false
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Notes', noteSchema);
