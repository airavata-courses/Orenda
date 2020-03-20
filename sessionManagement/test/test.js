const procData = require("../sessionService/sessionControllers");
const assert = require("assert");
InitiateMongoServer = require("../config/DBconfig");
InitiateMongoServer();

var testData = {
  uid: "fed32316-640d-11ea-bc55-0242ac130003",
  userID: "5e3bc2b3dc1e0835e81f1d43",
  inputData: {
    Year: "testInput",
    Month: "testInput",
    Day: "testInput",
    Radar: "testInput"
  },
  outputData: "testImageLink",
  taskState: "testState"
};

describe("Create session documents", () => {
  it("should create a new record successfully", done => {
    procData.createData(testData).then(data => {
      assert(data, 200); //if poke is saved to db it is not new
      done();
    });
  });
});

describe("Update session State ", () => {
  it("should give taskstate as executing", done => {
    procData.updateState(testData).then(data => {
      assert(data, 200); //if poke is saved to db it is not new
      done();
    });
  });
});

describe("Update session documents", () => {
  it("should give taskstate as executed", done => {
    procData.updateData(testData).then(data => {
      console.log(data)
      assert(data, 200); //if poke is saved to db it is not new
      done();
    });
  });
});
