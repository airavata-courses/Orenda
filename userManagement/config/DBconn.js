let mongoose = require("mongoose");

const dbPath =
  "mongodb+srv://" +
  process.env.DB_USER +
  ":" +
  process.env.DB_PASS +
  "@cluster0-389i7.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(dbPath, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "orendaDB"
});


const InitiateMongoServer = async () => {
    try {
      await mongoose.connect(dbPath, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "orendaDB"
      })
      console.log("Connected to DB !!");
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  

module.exports = InitiateMongoServer;

