kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/deployKafka/kafka/zookeeperDeployment.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/deployKafka/kafka/kafkaDeployment.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/deployKafka/kafka/kafkaService.yaml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Orenda/deployAnalysis/data_analysis/deployment.yaml
kubectl set image deployment/data-analysis-deployment  data-analysis=orenda15/data_analysis:"$1"
kubectl autoscale deployment data-analysis-deployment  --cpu-percent=50 --min=1 --max=10

