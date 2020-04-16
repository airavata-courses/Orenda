module.exports = function(app) {
  let eventHandler = require("./sessionControllers");
  app.post("/session", eventHandler.retrieveData);
};
