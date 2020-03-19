kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/develop/kafka/zookeeperDeployment.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/develop/kafka/kafkaDeployment.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/develop/kafka/kafkaService.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/develop/frontend/deployment.yaml
kubectl set image deployment/frontend-deployment  frontend=orenda15/frontend:latest

