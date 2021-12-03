##  How I dockerized This app and published it in DockerHub 


### Step 1 :

installed docker in my machine . 

### Step 2 :
typed the follwing commands:

    sudo systemctl restart docker

    sudo usermod -aG docker ${USER}

    su - ${USER}

### Step 3 :
went to the directory of dockerfile
    
    cd Cefalo-Internship-Nodejs

### Step 4 :
built the docker file with a tag
    
    docker build . -t jagonmoy/dsa-book-dockerize:v1.0.0

### Step 5:
Checked the Docker image if it runs
    
    docker run -it -p 60:8015 -d jagonmoy/dsa-book-dockerize:v1.0.0

### Step 6:
Finally pushed the image in Dockerhub

    docker image push jagonmoy/dsa-book-dockerize:v1.0.0
   

Here is the link of docker image : https://hub.docker.com/repository/docker/jagonmoy/dsa-book-dockerize

##  How I published my app in heroku through container registry ( Docker Deploy)

### Step 1 :

Log in to Heroku
  
    heroku login

### Step 2 :
Log in to Heroku Container
    
    heroku container:login

### Step 3 :
pushed the dockerfile into container
    
    heroku container:push web

### Step 4 :
release the app in container 

    heroku container:release web

Here is my app published in Heroku : https://dsa-book.herokuapp.com/