let mongoose = require("mongoose");
let config = require("./config");
const dbPath =
  "mongodb+srv://" +
  config.DATABASE.USERNAME +
  ":" +
  config.DATABASE.PASSWORD +
  config.DATABASE.CLUSTER ;

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(dbPath, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: config.DATABASE.NAME
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
