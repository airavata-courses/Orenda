

module.exports = function(app) {
        
        let task = require("./eventHandler");
        const uuidv1 = require('uuid/v1');

        app.post("/session",function( req,res){

                let uid=uuidv1()
                msg=req.body
                id=msg['userID']
               
                resID[uid]=res
                let data={"uid":uid,'userID':id}

                task.produce(data,'sessionManagementConsumerApiF')
        });

        app.post("/task",function( req,res){
                
                let uid=uuidv1()
                msg=req.body
                id=msg['userID']
                let data={"inputData":msg['inputData'],"uid":uid,'userID':id}
               
                // resID[uid]=res
                
                task.produce(data,'dataRetrievalConsumerF')

        });

};
