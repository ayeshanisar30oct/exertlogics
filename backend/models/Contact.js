const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema({
  phone: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    lowercase: true,
    default: null,
  },
  address: {
    type: String,
    default: null,
  },
  map: {
    type: String,
    default: null,
  },
});

// Check if the model already exists before defining it
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

module.exports = Contact;
