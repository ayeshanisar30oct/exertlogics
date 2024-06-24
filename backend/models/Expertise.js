const mongoose = require('mongoose');
const { Schema } = mongoose;

const expertiseSchema = new Schema({
  subTitle: {
    type: String,
    lowercase : true,
    default : null
    // required: true,
  },
  description: {
    type: String,
    lowercase : true,
    default : null
    // required: true,
  },
  expertise: [String]
});

// Check if the model already exists before defining it
const Expertise = mongoose.models.Expertise || mongoose.model('Expertise', expertiseSchema);

module.exports = Expertise;
