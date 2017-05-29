# Dockercon-demo-20170529
Demo project for the dockercon meetup.

It consists of a node js application. (Install node first) 
and then build it with;
```
npm install 
```

Now create the containers by changing in both create-image scripis the "phiroict" part in the name of your own docker hub. 
(If you do not have one, create one for free) 
Now run from the docker directory
```./create-image.sh``` 
And then the from the root directory the 
```./create-image-impl.sh```

Now run 
```docker stack deploy --compose-file docker-compose.yml stackdemo```
