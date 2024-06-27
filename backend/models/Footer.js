const mongoose = require('mongoose');
const { Schema } = mongoose;

const socialLinksSchema = new Schema({
    type: {
      type: String,
      lowercase : true,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  });

const footerSchema = new Schema({
  subTitle: {
    type: String,
    // lowercase : true,
    required: true,
  },
  copyrightText: {
    type: String,
    // lowercase : true,
    required: true,
  },
  socialLinks: [socialLinksSchema]
});

// Check if the model already exists before defining it
const Footer = mongoose.models.Footer || mongoose.model('Footer', footerSchema);

module.exports = Footer;
