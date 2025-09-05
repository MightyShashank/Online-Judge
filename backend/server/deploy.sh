# build img and push to docker hub
# docker build -t mightyshashank/codecollab:web-hook-server-image-v57 .
# docker push mightyshashank/codecollab:web-hook-server-image-v57

# apply manifests
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml
kubectl apply -f deployment.yaml
# kubectl apply -f service-lb.yaml
kubectl apply -f backend-config.yaml
kubectl apply -f service-internal.yaml   # if needed
kubectl apply -f hpa.yaml                # optional



# kubectl apply -f ingress-certificate.yaml deploy this part just once this is just for the domain, this can be deployed only once above are deployed
# kubectl apply -f ingress.yaml deploy this part just once this is just for the domain, this can be deployed only once above are deployed

# kubectl delete -f configmap.yaml
# kubectl delete -f secret.yaml
# kubectl delete -f deployment.yaml
# kubectl delete -f service-lb.yaml
# kubectl delete -f service-internal.yaml   # if needed
# kubectl delete -f hpa.yaml 

# kubectl describe managedcertificate gke-managed-cert
# kubectl describe ingress webhook-server-ingress