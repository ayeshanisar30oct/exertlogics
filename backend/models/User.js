import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    lowercase : true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function(v) {
        return /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(v);
      },
      message: 'Password must contain at least one uppercase letter, one digit, and one special character',
    },
  },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } },{ timestamps: true });

UserSchema.virtual('confirmPassword')
  .get(function() {
    return this._confirmPassword;
  })
  .set(function(value) {
    this._confirmPassword = value;
  });

UserSchema.pre('save', function(next) {
  if (this.password !== this._confirmPassword) {
    this.invalidate('confirmPassword', 'Passwords do not match');
  }
  next();
});

// Pre-save hook to hash the password
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Check if the model already exists before defining it
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;