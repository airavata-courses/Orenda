kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/develop/kafka/zookeeperDeployment.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/develop/kafka/kafkaDeployment.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/develop/kafka/kafkaService.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/develop/dataRetrieval/deployment.yaml
kubectl set image deployment/data-retrieval  data-retrieval=orenda15/data_retrieval:latest

