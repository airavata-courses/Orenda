module.exports = function(app) {
  let user = require("./controllers/user_controller");
  let config = require("../config/config");

  
  // Login routes
  app.post(config.routes.login, user.login);
  app.post(config.routes.register, user.register);
  app.get("/", user.serverStarted);

//   app.post("/reset_password", user.reset);
};

