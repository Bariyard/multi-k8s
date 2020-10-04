# building
docker build -t bariyard/multi-client:latest -t bariyard/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t bariyard/multi-server:latest -t bariyard/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t bariyard/multi-worker:latest -t bariyard/multi-worker:$SHA -f ./worker/Dockerfile ./worker
docker build -t bariyard/multi-graphql-server:latest -t bariyard/multi-graphql-server:$SHA -f ./graphql-server/Dockerfile ./worker
# pushing
docker push bariyard/multi-client:latest
docker push bariyard/multi-server:latest
docker push bariyard/multi-worker:latest
docker push bariyard/multi-graphql-server:latest
docker push bariyard/multi-client:$SHA
docker push bariyard/multi-server:$SHA
docker push bariyard/multi-worker:$SHA
docker push bariyard/multi-graphql-server:$SHA
# apply configuration to kubernate
kubectl apply -f k8s
# Imparative set latest image on each deployment
kubectl set image deployments/client-deployment client=bariyard/multi-client:$SHA
kubectl set image deployments/server-deployment server=bariyard/multi-server:$SHA
kubectl set image deployments/worker-deployment worker=bariyard/multi-worker:$SHA
kubectl set image deployments/graphql-server-deployment graphql-server=bariyard/multi-graphql-server:$SHA
