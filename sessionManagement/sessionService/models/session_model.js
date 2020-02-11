let mongoose = require('mongoose');


var sessionSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
   
  },
  inputData: {
    type: JSON
  },
  outputData: {
    type: String
  }
});

module.exports = mongoose.model('sessiondetails', sessionSchema);
