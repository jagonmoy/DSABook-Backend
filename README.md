# Project Title
<br>

In my Internship Program in **Cefalo Bangladesh Limited** I was asked to create a web Application having CRUD functionalities using NodeJs , ExpressJs and ReactJs . I had a choice to select any database in my project . So I have used MongoDB Atlas for database (NoSQL) . I have named my CRUD application **DSABook** as it contains blogs regarding data Structures and algorithms . In this readme I will mainly describe functionalities, code structures , api documentation and everyting related to my backend . 

<br><br>

# Table of Contents
<ul>
<li> <h3> <a href = "#deployment" > 1. Deployment </a> </h3> </li> 

<h4>&nbsp; &nbsp; &nbsp;<a href = "#deployheroku" > 1.1 Deployed in Heroku </a> </h4>

<h4>&nbsp; &nbsp; &nbsp;<a href = "#deploydockerhub" > 1.2 Docker Image Deployed in Docker Hub </a> </h4>

<h4>&nbsp; &nbsp; &nbsp;<a href = "#runimage" > 1.3 How to Run this Docker image in your machine </a> </h4>


</ul>

<br><br><br>

# <h1 id = 'deployment'> Deployment</h1>
<br><br>

<p> 

## <h2 id = 'deployheroku' > Deployment in Heroku </h2>
<br>

I have deployed backend and frontend part of **DSABook** separately in Heroku .

[(REST API) Backend Part of **DSABook** Deployed in Heroku](https://dsa-book-backend.herokuapp.com/)

<br><br>

## <h2 id = 'deploydockerhub' > Docker Image Deployed in Docker Hub</h2>
<br>

I have deployed image of backend and frontend part of DSABook separately in Docker Hub .

[(REST API) Image of backend Part of **DSABook** deployed in DockerHub](https://hub.docker.com/repository/docker/jagonmoy/dsa-book-backend)

<br><br>

## <h2 id = 'runimage' >How to run This Docker image in your machine </h2>
<br>

Install Docker in your machine and do all the commands and procedure to start docker in your terminal .
[This might help you to install docker in your machine](https://docs.docker.com/get-docker/) or you can find many youtube Tutorials . <br>
After Installing Docker in your machine and starting docker in your terminal you can type following command  .<br>

    docker run -it -p <port-number>:8015 -d jagonmoy/dsa-book-backend:v1.0.0

In place of **port-number** you will use any port number which is free and where you are wishing to run this application .

suppose , you want to use the port number **60** then your command will be <br>
  
    ​docker run -it -p 60:8015 -d jagonmoy/dsa-book-backend:v1.0.0

**(REST API)** Now you can visit backend part  of **DSABook** in :
http://localhost:60/

</p>