let mongoose = require('mongoose');


var sessionSchema = new mongoose.Schema({
  sessionID: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
   
  },
  inputfile: {
    type: String
  },
  outputfile: {
    type: String
  }
});

module.exports = mongoose.model('sessionDetails', sessionSchema);
