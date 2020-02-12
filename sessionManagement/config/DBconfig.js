let mongoose = require("mongoose");

const dbPath =
  "mongodb+srv://" +
  process.env.DB_USER +
  ":" +
  process.env.DB_PASS +
  "@cluster0-389i7.mongodb.net/test?retryWrites=true&w=majority";


const InitiateMongoServer = async () => {
    try {
      console.log("Connecting to DB !!");

      await mongoose.connect(dbPath, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "sessionDB"
      })
      console.log("Connected to DB !!");
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  

module.exports = InitiateMongoServer;

