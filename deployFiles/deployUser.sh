kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/deployKafka/kafka/zookeeperDeployment.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/deployKafka/kafka/kafkaDeployment.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/deployKafka/kafka/kafkaService.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/deployUser/userManagement/deployment.yaml
kubectl set image deployment/user-management-deployment  user-management=orenda15/user_management:"$1"
kubectl autoscale deployment user-management-deployment  --cpu-percent=50 --min=1 --max=10


