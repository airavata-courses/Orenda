const producer=require('../config/kafkaConfig').producer

 function produce(msg,topic) {

msg=JSON.stringify(msg)
return new Promise((resolve,reject)=>{
    let payloads = [
        {
        topic: topic,
        messages: msg
        }
    ]
    producer.send(payloads, (error, data) => {
        if (error) {
            console.log(error)
            reject(error)
        } else {  
        console.log('produced')
       
        resolve(data)
        }
    })
})
}

module.exports = { produce };