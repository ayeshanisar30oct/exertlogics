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

const HeaderSchema = new Schema({
  siteTitle: {
    type: String,
    required: true,
  },
  links: [linkSchema],
});

// Check if the model already exists before defining it
const Header = mongoose.models.Header || mongoose.model('Header', HeaderSchema);

module.exports = Header;
