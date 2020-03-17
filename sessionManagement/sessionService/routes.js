module.exports = function(app) {
  let eventHandler = require("./sessionControllers");
  app.get("/session", eventHandler.retrieveData);
};
