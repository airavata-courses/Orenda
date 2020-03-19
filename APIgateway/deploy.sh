kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/develop/kafka/zookeeperDeployment.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/develop/kafka/kafkaDeployment.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/develop/kafka/kafkaService.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/develop/APIgateway/deployment.yaml
kubectl set image deployment/api-gateway-deployment  api-gateway=orenda15/api_gateway:latest
