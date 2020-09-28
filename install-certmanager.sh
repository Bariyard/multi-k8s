# enable ingress
minikube addons enable ingress

# create secret
kubectl create secret generic pgpassword --from-literal PGPASSWORD=pgpassword

# install cert-manager using helm
kubectl apply --validate=false -f https://github.com/jetstack/cert-manager/releases/download/v1.0.2/cert-manager.yaml
kubectl create namespace cert-manager

helm repo add jetstack https://charts.jetstack.io
helm repo update
helm install \
  cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --version v1.0.2 \
  --set installCRDs=true