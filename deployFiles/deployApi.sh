kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/deployKafka/kafka/zookeeperDeployment.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/deployKafka/kafka/kafkaDeployment.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/deployKafka/kafka/kafkaService.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/deployApi/APIgateway/deployment.yaml
kubectl set image deployment/api-gateway-deployment  api-gateway=orenda15/api_gateway:"$1"
kubectl autoscale deployment api-gateway-deployment  --cpu-percent=50 --min=1 --max=10

