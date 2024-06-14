const mongoose = require('mongoose');
const { Schema } = mongoose;

const aboutSchema = new Schema({
  subTitle: {
    type: String,
    lowercase : true,
    required: true,
  },
  description: {
    type: String,
    lowercase : true,
    required: true,
  },
  employeesCount: {
    type: Number,
    default : 0,
  },
  projectsCount: {
    type: Number,
    default : 0,
  },
  clientsCount: {
    type: Number,
    default : 0,
  },

  aboutBannerUrl: {
    type: String,
    required: true,
  },
});

// Check if the model already exists before defining it
const About = mongoose.models.About || mongoose.model('About', aboutSchema);

module.exports = About;
