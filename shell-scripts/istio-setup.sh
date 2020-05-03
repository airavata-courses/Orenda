istioctl manifest apply \
--set values.pilot.env.PILOT_HTTP10=1 \
--set values.kiali.enabled=true \
--set values.grafana.enabled=true \
--set values.prometheus.enabled=true \
--set values.global.istioNamespace=istio-system  \
--set values.gateways.istio-egressgateway.enabled=true   \
--set values.gateways.istio-ingressgateway.enabled=true \
--set values.pilot.enableProtocolSniffingForOutbound=true \
--set values.pilot.enableProtocolSniffingForInbound=true \
--set values.security.citadelHealthCheck=true \
--set values.global.mtls.enabled=true \
> istioSetup.yaml

kubectl label namespace default istio-injection=enabled


KIALI_PASSPHRASE=$(read -sp 'Kiali Passphrase: ' pval && echo -n $pval | base64)
KIALI_USERNAME=$(read -p 'Kiali Username: ' uval && echo -n $uval | base64)
NAMESPACE=istio-system
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Secret
metadata:
  name: kiali
  namespace: $NAMESPACE
  labels:
    app: kiali
type: Opaque
data:
  username: $KIALI_USERNAME
  passphrase: $KIALI_PASSPHRASE
EOF



kubectl apply -f ./istio-gateway.yaml

export INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="http2")].nodePort}')
export SECURE_INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="https")].nodePort}')
export INGRESS_HOST=149.165.170.101
export GATEWAY_URL=$INGRESS_HOST:$INGRESS_PORT
echo http://$GATEWAY_URL/


