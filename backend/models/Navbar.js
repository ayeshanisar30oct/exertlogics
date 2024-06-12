const mongoose = require('mongoose');
const { Schema } = mongoose;

const linkSchema = new Schema({
  title: {
    type: String,
    lowercase : true,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const navBarSchema = new Schema({
  logo: {
    type: String,
    required: true,
  },
  siteTitle: {
    type: String,
    required: true,
  },
  links: [linkSchema],
});

// Check if the model already exists before defining it
const NavBar = mongoose.models.NavBar || mongoose.model('NavBar', navBarSchema);

module.exports = NavBar;
