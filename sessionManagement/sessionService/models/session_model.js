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
    type: JSON,
    required: true
  },
  outputData: {
    type: String
  },
  taskState:{
    type: String,
    default:'None'
  }
});

sessionSchema.set('timestamps', true);
module.exports = mongoose.model('sessiondetails', sessionSchema);
