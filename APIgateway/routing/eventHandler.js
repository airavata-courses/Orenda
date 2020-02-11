const producer=require('../config/kafkaConfig').producer

exports.submitTask = async function login(req, res, next) {

msg=JSON.stringify(req)
return new Promise((resolve,reject)=>{
    let payloads = [
        {
        topic: 'dataRetrievalConsumer1',
        messages: msg
        }
    ]
    producer.send(payloads, (error, data) => {
        if (error) {
            console.log(error)
            reject(error)
        } else {
        console.log('sent')
        resolve(data)
        }
    })
})
}