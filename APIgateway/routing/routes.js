

module.exports = function(app) {
        let task = require("./eventHandler");
        const uuidv1 = require('uuid/v1');

        app.get("/session",function( req,res){


        });

        app.post("/task",function( req,res){
                
                let uid=uuidv1()
                msg=req.body
                id=msg['userID']
                let data={"data":msg,"uid":uid,'userID':id}
                console.log(data,msg)
                resID[uid]=res
                
                task.submitTask(data)

        });

};
