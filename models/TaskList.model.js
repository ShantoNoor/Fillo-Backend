import mongoose from "mongoose";
const { Schema } = mongoose;

const taskListSchema = new Schema({
  todo: {
    require: false,
    type: String,
    default: "",
  },
  ongoing: {
    require: false,
    type: String,
    default: "",
  },
  complete: {
    require: false,
    type: String,
    default: "",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
    unique: true,
  },
});

const TaskList = mongoose.model("TaskList", taskListSchema);
export default TaskList;
