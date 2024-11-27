
const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema(
  {
    title:String,
    status:String,
    content:String,
    timeStart:Date,
    timeFinish: Date,
    // priority: String,
    // createdBy: String,
    // updatedBy: String,
    // deletedBy: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);
const Task = mongoose.model("Task", taskSchema, "tasks");
// console.log(productSchema);

module.exports = Task;
