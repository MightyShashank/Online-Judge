# this .sh is supposed to be run once only and only run it after running deploy.sh
# this is only for kong
kubectl apply -f ingress.yaml
kubectl apply -f kong-routes.yaml
kubectl apply -f kong-jwt-plugin.yaml

# kubectl delete -f kong-values.yaml
# kubectl delete -f kong-routes.yaml
# kubectl delete -f kong-jwt-plugin.yaml