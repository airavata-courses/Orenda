kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/deployKafka/kafka/zookeeperDeployment.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/deployKafka/kafka/kafkaDeployment.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/deployKafka/kafka/kafkaService.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/deploySession/sessionManagement/deployment.yaml
kubectl set image deployment/session-management-deployment  session-management=orenda15/session_management:"$1"
kubectl autoscale deployment session-management-deployment --cpu-percent=50 --min=1 --max=10
