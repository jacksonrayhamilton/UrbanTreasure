# Urban Treasure

Follow clues leading across a large city to find a needle in a haystack.

## Setup

- Install both Docker Engine and Docker Compose.
- For deployments, install Kubernetes (kubectl).  Set up ~/.kube/config for your production cluster.  Your cloud hosting provider should provide instructions or a utility to set it up.

## Development

1. Make any changes to the code.
2. Run: `docker-compose up --build`
3. Access the server at: http://localhost:3000
4. Press ^C to stop the server.
5. To make/test more changes, repeat from Step 1.

## Deployment

Run commands to create and push Docker images:

```
npm run build
docker build -t jacksonrayhamilton/urbantreasure-nodejs -f nodejs.prod.Dockerfile .
docker build -t jacksonrayhamilton/urbantreasure-nginx -f nginx.Dockerfile .
docker push jacksonrayhamilton/urbantreasure-nodejs
docker push jacksonrayhamilton/urbantreasure-nginx
```

Change to a directory with Kubernetes config files:

```
cd k8s
```

To initially deploy the application, run:

```
kubectl create -f db-data-persistentvolumeclaim.yaml,mongodb-deployment.yaml,mongodb-service.yaml,nginx-deployment.yaml,nginx-service.yaml,nodejs-deployment.yaml,nodejs-service.yaml
```

To redeploy the application, you may typically run the following commands:

```
kubectl delete -f nginx-deployment.yaml,nodejs-deployment.yaml
kubectl create -f nginx-deployment.yaml,nodejs-deployment.yaml
```

Use kubectl to discover the EXTERNAL-IP of the load balancer through which you can access your deployed application:

```
$ kubectl get service nginx
NAME    TYPE           CLUSTER-IP      EXTERNAL-IP       PORT(S)        AGE
nginx   LoadBalancer   XXX.XXX.XXX.XXX 134.209.134.130   80:XXXXX/TCP   15m
```

### Managing the database

Figure out the MongoDB pod name:

```
$ kubectl get pods
NAME                       READY   STATUS    RESTARTS   AGE
mongodb-xxx-yyy            1/1     Running   0          35m
```

Access the database:

```
kubectl exec --stdin --tty mongodb-xxx-yyy -- /bin/bash
mongo
> use urbantreasure
```

You could clear out any old data like so:

```
> db.games.deleteMany({})
```
