kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/deployKafka/kafka/zookeeperDeployment.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/deployKafka/kafka/kafkaDeployment.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/deployKafka/kafka/kafkaService.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/deployModelling/dataModelling/deployment.yaml
kubectl set image deployment/data-modelling-deployment  data-modelling=orenda15/data_modelling:"$1"
kubectl autoscale deployment data-modelling-deployment --cpu-percent=50 --min=1 --max=10


