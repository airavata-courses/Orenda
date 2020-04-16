kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/deployKafka/kafka/zookeeperDeployment.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/deployKafka/kafka/kafkaDeployment.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/deployKafka/kafka/kafkaService.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/deployFrontend/frontend/deployment.yaml
kubectl set image deployment/frontend-deployment  frontend=orenda15/frontend:"$1"
kubectl autoscale deployment frontend-deployment --cpu-percent=50 --min=1 --max=10

