const { ref } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  title: {
    type: String,
    lowercase: true,
    default: null,
    // required: true,
  },
  projectId : [{type : mongoose.Schema.ObjectId, ref : 'Project'}]
});

// Check if the model already exists before defining it
const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

module.exports = Category;
