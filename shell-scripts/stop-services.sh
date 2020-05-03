kubectl delete -f https://raw.githubusercontent.com/airavata-courses/Orenda/deployKafka/kafka/zookeeperDeployment.yaml 
kubectl delete -f https://raw.githubusercontent.com/airavata-courses/Orenda/deployKafka/kafka/kafkaDeployment.yaml 
kubectl delete -f https://raw.githubusercontent.com/airavata-courses/Orenda/deployKafka/kafka/kafkaService.yaml 

kubectl delete -f https://raw.githubusercontent.com/airavata-courses/Orenda/istioAnalysis/deploymentFiles/deployment.yaml
kubectl delete -f https://raw.githubusercontent.com/airavata-courses/Orenda/istioAnalysis/deploymentFiles/hpa.yaml

kubectl delete -f https://raw.githubusercontent.com/airavata-courses/Orenda/istioModelling/deploymentFiles/deployment.yaml
kubectl delete -f https://raw.githubusercontent.com/airavata-courses/Orenda/istioModelling/deploymentFiles/hpa.yaml

kubectl delete -f https://raw.githubusercontent.com/airavata-courses/Orenda/istioRetrieval/deploymentFiles/deployment.yaml
kubectl delete -f https://raw.githubusercontent.com/airavata-courses/Orenda/istioRetrieval/deploymentFiles/hpa.yaml

kubectl delete -f https://raw.githubusercontent.com/airavata-courses/Orenda/istioApi/deploymentFiles/deployment.yaml
kubectl delete -f https://raw.githubusercontent.com/airavata-courses/Orenda/istioApi/deploymentFiles/hpa.yaml

kubectl delete -f https://raw.githubusercontent.com/airavata-courses/Orenda/istioUser/deploymentFiles/deployment.yaml
kubectl delete -f https://raw.githubusercontent.com/airavata-courses/Orenda/istioUser/deploymentFiles/hpa.yaml

kubectl delete -f https://raw.githubusercontent.com/airavata-courses/Orenda/istioSession/deploymentFiles/deployment.yaml
kubectl delete -f https://raw.githubusercontent.com/airavata-courses/Orenda/istioSession/deploymentFiles/hpa.yaml


kubectl delete -f https://raw.githubusercontent.com/airavata-courses/Orenda/istioAnalysis/deploymentFiles/dataanalysisCanary.yaml
kubectl delete -f https://raw.githubusercontent.com/airavata-courses/Orenda/istioModelling/deploymentFiles/datamodellingCanary.yaml
kubectl delete -f https://raw.githubusercontent.com/airavata-courses/Orenda/istioRetrieval/deploymentFiles/dataretrievalCanary.yaml
kubectl delete -f https://raw.githubusercontent.com/airavata-courses/Orenda/istioApi/deploymentFiles/apiGatewayCanary.yaml
kubectl delete -f https://raw.githubusercontent.com/airavata-courses/Orenda/istioUser/deploymentFiles/userManagementCanary.yaml
kubectl delete -f https://raw.githubusercontent.com/airavata-courses/Orenda/istioSession/deploymentFiles/sessionManagementCanary.yaml


kubectl delete -f https://raw.githubusercontent.com/airavata-courses/Orenda/istioFrontend/deploymentFiles/frontendCanary.yaml
kubectl delete -f https://raw.githubusercontent.com/airavata-courses/Orenda/istioFrontend/deploymentFiles/deployment.yaml
kubectl delete -f https://raw.githubusercontent.com/airavata-courses/Orenda/istioFrontend/deploymentFiles/hpa.yaml