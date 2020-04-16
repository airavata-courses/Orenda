kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/deployKafka/kafka/zookeeperDeployment.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/deployKafka/kafka/kafkaDeployment.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/deployKafka/kafka/kafkaService.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/deployRetrieval/dataRetrieval/deployment.yaml
kubectl set image deployment/data-retrieval-deployment  data-retrieval=orenda15/data_retrieval:"$1"
kubectl autoscale deployment data-retrieval-deployment --cpu-percent=50 --min=1 --max=10

