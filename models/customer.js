const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define our model
const customerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  lastModifiedBy: {
    type: String,
    required: true
  }
});

// Create the model class
const ModelClass = mongoose.model("customer", customerSchema);

// Export the model
module.exports = ModelClass;
