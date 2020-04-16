const request = require("supertest");
const expect = require("expect");
const app = require("../server");
var User = require("../userService/models/user-model");

let userRegister = {
  firstName: "John",
  lastName: "Doe",
  email: "john@gmail.com",
  password: "John@123"
};

userSignin = {
  email: "john@gmail.com",
  password: "John@123"
};

describe("Server test", () => {
  it("should say server started", done => {
    request(app)
      .get("/")
      .expect(200)
      .expect(res => {
        expect(res.text).toBe("Server Started");
        done();
      })
      .end((err, res) => {
        if (err) return done(err);
      });
  });
});

describe("User Exists", () => {
  it("should give status 400", done => {
    
    request(app)
      .post("/register")
      .send(userRegister)
      .expect(res => {
        expect(res.status).toBe(400)
        done();
      })
      .end((err, res) => {
        if (err) return done(err);
      });
  });
});


describe("Login User", () => {
  it("should give status 200", done => {
    request(app)
      .post("/login")
      .send(userSignin)
      .expect(res => {
        expect(res.status).toBe(200)
        done();
      })
      .end((err, res) => {
        if (err) return done(err);
      });
  });
});
