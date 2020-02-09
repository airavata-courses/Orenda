var mongoose = require('mongoose');
const { ObjectID } = mongoose.Schema;

var sessionSchema = new mongoose.Schema({
  sessionID: {
    type: ObjectID,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  inputfile: {
    type: String
  },
  outputfile: {
    type: String
  }
});

module.exports = mongoose.Schema('sessions', sessionSchema);
