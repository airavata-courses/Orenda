

module.exports = function(app) {
        let config = require('../config/config');
        let eventHandler = require("./eventHandler");

        app.post(config.routes.session,eventHandler.session);
        app.post(config.routes.task,eventHandler.task);
<<<<<<< HEAD
=======
        app.get("/",eventHandler.serverStarted);
>>>>>>> develop

};
