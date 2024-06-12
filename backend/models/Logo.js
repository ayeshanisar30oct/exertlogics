const mongoose = require('mongoose');
const { Schema } = mongoose;

const logoSchema = new Schema({
  logoLightUrl: {
    type: String,
    default : null,
    // required: true,
  },
  logoDarkUrl: {
    type: String,
    default: null,
  },
  faviconUrl: {
    type: String,
    default: null,
  },
});

// Check if the model already exists before defining it
const Logo = mongoose.models.Logo || mongoose.model('Logo', logoSchema);

module.exports = Logo;
