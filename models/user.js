const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const hashPassword = require("../helpers/hashPassword");

// Define our model
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    default: 1,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value"
    }
  }
});

// On Save Hook, encrypt password
userSchema.pre("save", async function(next) {
  const user = this;

  const hashedPassword = await hashPassword(user.password);
  user.password = hashedPassword;

  return next();
});

// On UpdateOne Hook, encrypt password
userSchema.pre("updateOne", async function(next) {
  const user = this;

  const hashedPassword = await hashPassword(user._update.password);
  user._update.password = hashedPassword;

  return next();
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);

    callback(null, isMatch);
  });
};

// Create the model class
const ModelClass = mongoose.model("user", userSchema);

// Export the model
module.exports = ModelClass;
