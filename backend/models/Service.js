const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceSchema = new Schema({
  title: {
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
  serviceBannerUrl: {
    type: String,
    // required: true,
  },
});

// Check if the model already exists before defining it
const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

module.exports = Service;
