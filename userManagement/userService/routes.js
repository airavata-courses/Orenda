module.exports = function(app) {
  let user = require("./controllers/user_controller");
  // Login routes
  app.post("/login", user.login);
  app.post("/register", user.register);
//   app.post("/reset_password", user.reset);
};
