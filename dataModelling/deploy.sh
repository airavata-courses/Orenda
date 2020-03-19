kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/develop/kafka/zookeeperDeployment.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/develop/kafka/kafkaDeployment.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/develop/kafka/kafkaService.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/develop/dataModelling/deployment.yaml
kubectl set image deployment/data-modelling-deployment  data-modelling=orenda15/data_modelling:latest
