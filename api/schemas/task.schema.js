// importing dependencies
const mongoose = require("mongoose");

// creating  schema to be stored in db
const taskSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, trim: true, lowercase: true },
    description: { type: String },
    status: { type: String },
    dueDate: { type: Date },
  },
  {
    timestamps: true,
    collection: "tasks",
  }
);

// exporting schema
module.exports = mongoose.model("Task", taskSchema);
