const mongoose = require('mongoose');
const { Schema } = mongoose;

const homeSchema = new Schema({
  title: {
    type: String,
    lowercase : true,
    required: true,
  },
  subTitle: {
    type: String,
    lowercase : true,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
});

// Check if the model already exists before defining it
const Home = mongoose.models.Home || mongoose.model('Home', homeSchema);

module.exports = Home;
