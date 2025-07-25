// import mongoose from "mongoose";

// const TaskSchema = new mongoose.Schema({
//   tittle: {
//     type: String,
//     required: true,
//   },
//   content: {
//     type: String,
//     required: true,
//   },
//   addedDate: {
//     type: Date,
//     required: true,
//     default: Date.now(),
//   },
//   status: {
//     type: String,
//     enum: ["pending", "completed"],
//     default: "pending",
//   },

//   userId: {
//     type: mongoose.ObjectId,
//     required: true,
//   },
// });

// export const Task =
//   mongoose.models.tasks || mongoose.model("tasks", TaskSchema);



// models/task.js
import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  tittle: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  addedDate: {
    type: Date,
    required: true,
    default: Date.now, // Use Date.now without parentheses for a function reference
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Use mongoose.Schema.Types.ObjectId for referencing
    required: true,
    ref: "users", // Add a 'ref' to indicate which model this ObjectId refers to
  },
});

export const Task = mongoose.models.tasks || mongoose.model("tasks", TaskSchema);