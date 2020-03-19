kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/develop/kafka/zookeeperDeployment.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/develop/kafka/kafkaDeployment.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/develop/kafka/kafkaService.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/develop/sessionManagement/deployment.yaml
kubectl set image deployment/fsession-management-deployment  session-management=orenda15/session_management:latest

