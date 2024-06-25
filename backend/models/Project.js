const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref : 'User' },
  title: {
    type: String,
    // lowercase: true,
    default: null,
    // required: true,
  },
  description: {
    type: String,
    // lowercase: true,
    default: null,
    // required: true,
  },
  backgroundUrl: { type: String },
  logoUrl: { type: String },
});

// Check if the model already exists before defining it
const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

module.exports = Project;
