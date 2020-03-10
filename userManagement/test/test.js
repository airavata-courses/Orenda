let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server.js");
let should = chai.should();

chai.use(chaiHttp);


describe("Server test", function() {
    afterEach(function() {
        server.close();
      });
  it("it should show server as started", done => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        res.text.should.be.equal("Server Started");
        done();
      });
  });
});

describe("User already exists", function() {
    afterEach(function() {
        server.close();
      });


  it("it should POST the user with given details", done => {
    let user = {
      firstName: "John",
      lastName: "Doe",
      email: "john@gmail.com",
      password: "John@123"
    };
    chai
      .request(server)
      .post("/register")
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});


describe("User Login", () => {
    afterEach(function() {
        server.close();
      });
 
    it("it should get the user with given email", done => {
        let user = {
            email: "john@gmail.com",
            password: "John@123"
          };  
      chai
        .request(server)
        .post("/login")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });