const { ref } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  title: {
    type: String,
    lowercase: true,
    default: null,
    // required: true,
  }
});

// // Virtual field to populate projects
// categorySchema.virtual('projects', {
//   ref: 'Project',
//   localField: '_id',
//   foreignField: 'categoryId'
// });

// // Ensure virtual fields are serialized
// categorySchema.set('toObject', { virtuals: true });
// categorySchema.set('toJSON', {
//     virtuals: true, // Keep virtuals enabled
//     transform: (doc, ret) => {
//       delete ret.id; // Remove `id` field from the output
//       return ret;
//     }
//   });

// Check if the model already exists before defining it
const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

module.exports = Category;
