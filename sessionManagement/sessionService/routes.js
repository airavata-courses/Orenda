module.exports = function(app) {
  let eventHandler = require("./sessionControllers");
  app.get("/", eventHandler.retrieveData);
};
