let mongoose = require("mongoose");
var validator = require("validator");

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
   
  },
  password: { type: String, required: true },
  firstName: { type: String},
  lastName: { type: String},
  // securityQuestion: { type: String}
});

module.exports = mongoose.model("users", UserSchema);
