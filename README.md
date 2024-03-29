
 # <h1 align = 'center'> DSABook </h1>
<br>

**This is a Readme For Backend Part of the Application DSABook** 
<br>

# Table of Contents
<ul>
<li> <h3> <a href = "#introduction" > 1. &nbsp; Introduction </a> </h3> </li>
<br>

<h4>&nbsp; &nbsp; &nbsp;<a href = "#technology" > 1.1 &nbsp; Technology </a> </h4>

<h4>&nbsp; &nbsp; &nbsp;<a href = "#runproject" > 1.2 &nbsp; How to Run this Project in your machine </a> </h4>

<br>

<li> <h3> <a href = "#deployment" > 2. &nbsp; Deployment </a> </h3> </li> 
<br>

<li> <h3> <a href = "#api" > 3.&nbsp;  API Documentation </a> </h3> </li> 

<br>

<h4>&nbsp; &nbsp; &nbsp;<a href = "#authapi" > 3.1 &nbsp; Auth Related Endpoints </a> </h4>

<br>

<h4>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<a href =  "#signup" > 3.1.1 &nbsp;  Sign Up :&nbsp; POST &nbsp; /api/auth/signup/ </a> </h4>

<h4>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<a href =  "#signin" > 3.1.2 &nbsp; Sign In :&nbsp; POST &nbsp; /api/auth/signin/ </a> </h4>

<h4>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<a href =  "#signout" > 3.1.3 &nbsp;  Sign Out :&nbsp; POST &nbsp; /api/auth/signout/ </a> </h4>

<br>

<h4>&nbsp; &nbsp; &nbsp;<a href = "#blogapi" > 3.2 &nbsp;  Blog Related Endpoints </a> </h4>

<br>

<h4>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<a href =  "#getallblogs" > 3.2.1 &nbsp; Get All Blogs:&nbsp; GET  &nbsp;   /api/blogs/ </a> </h4>

<h4>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<a href =  "#getblog" > 3.2.2 &nbsp; Get a Blog :&nbsp; GET &nbsp;  /api/blogs/:id/ </a> </h4>

<h4>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<a href =  "#createblog" > 3.2.3 &nbsp; Create Blog :&nbsp; POST &nbsp; /api/blogs/ </a> </h4>

<h4>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<a href =  "#updateblog" > 3.2.4 &nbsp; Update Blog :&nbsp; PATCH &nbsp; /api/blogs/:id/ </a> </h4>

<h4>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<a href =  "#deleteblog" > 3.2.5 &nbsp; Delete Blog :&nbsp; DELETE &nbsp; /api/blogs/:id/ </a> </h4>

<br>


<h4>&nbsp; &nbsp; &nbsp;<a href = "#userapi" > 3.3 &nbsp; User Related Endpoints </a> </h4>

<br>

<h4>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<a href =  "#getallusers" > 3.3.1 &nbsp;  Get All Users:&nbsp; GET  &nbsp;   /api/users/ </a> </h4>

<h4>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<a href =  "#getuser" > 3.3.2 &nbsp; Get a User :&nbsp; GET &nbsp;  /api/users/:username/ </a> </h4>

<h4>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<a href =  "#getuserblogs" > 3.3.3 &nbsp; Get Blogs of a User :&nbsp; GET &nbsp; /api/users/:username/myblog </a> </h4>

<br><br>


# <h1 id = 'introduction'> 1. Introduction</h1>
<br>

## <h2 id = 'technology' > 1.1 Technology </h2>
<br>
  
  [Nodejs](https://nodejs.org/en/) : &nbsp; A javascript Runtime <br>
  [Expressjs](https://expressjs.com/) : &nbsp; A Nodejs Framework <br>
  [MongoDB Atlas](https://www.mongodb.com/atlas/database) : &nbsp; a NoSQL Cloud Database <br>
  [Mongoose](https://mongoosejs.com/) : &nbsp; mongodb object modeling for node.js <br>
  [JEST](https://jestjs.io/) : &nbsp; javascript testing framework <br>
  <br>
  and others...
<br>

## <h2 id = 'runproject' > 1.3  How to Run this Project </h2>
<br>

### Step 1 :
<br> 
Make you you have Node installed in your machine . If not then install node in your machine
<br><br>

### Step 2 :
<br>
Clone this Github Repository <br><br>
<pre>git clone https://github.com/jagonmoy/Cefalo-Internship-Nodejs.git</pre>
<br>

### Step 3 :
<br>

create a database in mongoDB Atlas and then copy paste the mongoDB atlas connection url in environment file which is described in step 4 .

<br>

### Step 4 :
<br>
create a file called config.env and write all the values of corresponding environment variable : <br><br>
<br>
A sample config file can be like this , <br><br>
<pre>

DATABASE=mongodb+srv://username:password@cluster0.sxo2i.mongodb.net/projectName?retryWrites=true&w=majority
HOST=0.0.0.0
PORT=3010
ACCESS_TOKEN_EXPIRE=2m
ACCESS_TOKEN_SECRET=thisisaccesstokensecret
REFRESH_TOKEN_SECRET=thisisrefreshtokensecret
FRONTEND_URL=*
</pre>
<br>
### Step 5 :
<br>
make sure you have any package manager ( e.g npm,yarn etc) installed in your machine . Then run the following command <br> <br>
for npm <br> <br>
<pre> npm install</pre>    
<br>
for yarn <br> <br>
<pre> yarn install</pre>    
<br>

### Step 6 :
<br>
after doing all the steps now you can run the following command <br><br>
for npm ,<br><br>
<pre>npm start</pre>

if there is no error then it should run perfectly!!

# <h1 id = 'deployment'> 2. Deployment</h1>
<br>

[Backend Part of **DSABook** Deployed in Render](https://dsabook.onrender.com)

<br>

# <h1 id = 'api'> 3. API Documentation</h1>
<br>

**I have tried to Follow the REST API Principles to build API Endpoints for this DSABook web application**


<br>

## <h2 id = 'authapi' > 3.1 Auth Related Endpoints </h2>
<br>

- ### <h3 id = 'signup'> 3.1.1 Sign Up : &nbsp;  **POST &nbsp; /api/auth/signup/** </h2> <br><br> 

  - #### **Valid Response**: <br><br>

     A sample request body can be like this , <br><br>
     ```json
      {
          "name" : "jagoth" ,
          "username" : "jagoth",
          "email" : "jagoth@mail.com",
          "password" : "12345678",
          "confirmPassword" : "12345678"
      }
     ```
     <br>

    - If any signed in user is not trying to sign up again which can be measured by **verifying JWT token sent with cookie**.
    - If values of all the fields are passing validations.
    - if email , username is unique.
    <br><br>

    then rsponse will be okay with a status code **200 OK** along with a response . By default the   response will be in **json** format but you can ask the response in xml format . For this we   need to set **Accept** header to **application/xml** then  it will return a xml file . 
    
    **Status : 200 OK**

      ```json
      {
        "format": "*/*",
        "data": {
            "name": "jagoth",
            "username": "jagoth",
            "email": "jagoth@mail.com",
            "createdAt": "2021-12-08T10:10:34.740Z",
            "updatedAt": "2021-12-08T10:10:34.740Z"
        }
      }   
      ```


   - #### **Person Already Signed in Error**: <br><br>
     suppose the person is already signed in But he trying to sign up then he will not be able to sign up . **This checking is done by verifying the jwt token sent with cookie .** 

     **Status : 403 Forbidden**
      ```json
      {
        "format": "*/*",
        "errors": [
           "Sign Out First And Then Try Again!"
        ] 
      }
     ```

   - #### **Validation Error**: <br><br>
     if there is any validation error then status code  will be **422 Unprocessable Entity** .   

     **Conditions for validations are :**
      - name must be between 5 to 30 letters 
      - username must be between 5 t0 15 letters 
      - email should be a valid email 
      - password should be atleast 8 characters long
      - confirmPassword should match with password
      <br><br>

      Suppose the name is not between 5 to 30 letters and password doesn't match .


     **Status : 422 Unprocessable Entity**

     response body, <br>
     ```json
      {
          "message": "request failed",
          "errors": [
              "Name must be between 5 to 30 letters",
              "Confirmation Password Does not match"
          ]
      }
     ```
   
    - #### **Email or Unsername Not Unique Error**: <br><br>
     
      If the username or email is not unique
     
      **Status : 403 Forbidden**
     
       ```json
        {
         "format": "*/*",
         "errors": [
           "Email is not Unique"
          ]
        }
      ```
     
   <br>

- ### <h3 id = 'signin' > 3.1.2 Sign In : &nbsp;  **POST &nbsp; /api/auth/signin/**</h3> <br><br>

  - #### **Valid Response**: <br><br>

     A sample request body can be like this , <br><br>
     ```json
      {
          "email" : "jagoth@mail.com",
          "password" : "12345678",
      }
     ```
     <br>

    - If any signed in user is not trying to sign in again which can be measured by **verifying JWT token sent with cookie**.
    - If values of all the fields are passing validations.
    - if email and password is correct.
    <br><br>

    then rsponse will be okay with a status code **200 OK** along with a response . By default the   response will be in **json** format but you can ask the response in xml format . For this we   need to set **Accept** header to **application/xml** then  it will return a xml file . 
    
    **Status : 200 OK**

      ```json
      {
         "format": "*/*",
         "data": "jagoth"
      }
      ```


   - #### **Person Already Signed in Error**: <br><br>
     suppose the person is already signed in But he trying to sign up then he will not be able to sign up . **This checking is done by verifying the jwt token sent with cookie .** 

     **Status : 403 Forbidden**
     ```json
      {
        "format": "*/*",
        "errors": [
            "Sign Out First And Then Try Again!"
        ]
      }
     ```

   - #### **Validation Error**: <br><br>
     if there is any validation error then status code  will be **422 Unprocessable Entity** .   

     **Conditions for validations are :**
      - email should not be empty
      - email should be valid
      - password should not be empty
      <br><br>

      Suppose the email is not valid and password field is empty .


     **Status : 422 Unprocessable Entity**

     response body, <br>
     ```json
     {
         "message": "request failed",
         "errors": [
             "Email field should be valid",
             "Password filed should not be Empty"
         ]
     }
     ```
   
    - #### **Email or Unsername is not correct Error**: <br><br>
     
      Suppose the email not correct then error will be like this ,
     
      **Status : 401 Not Authorized**
     
       ```json
        {
            "format": "*/*",
            "errors": [
                "Incorrect Email"
            ]
        }
      ```
     
   <br>

- ### <h3 id = "signout"> 3.1.3 Sign Out : &nbsp;  **POST &nbsp; /api/auth/signout/** </h3> <br><br>

  - #### **Valid Response**: <br><br>

    - If a person is not signed in but trying to sign out which can be measured by **verifying JWT token sent with cookie**.
    <br><br>
    
    then response will be okay with a status code **200 OK** along with a response . By default the response will be in **json** format but you can ask the response in xml format . For this we   need to set **Accept** header to **application/xml** then  it will return a xml file . 
    
    **Status : 200 OK**

      ```json
      {
          "format": "*/*",
          "data": "Signed Out Successfully!"
      }
      ```


   - #### **Person is not Signed in Error**: <br><br>
     suppose the person is not signed in But he trying to sign out then he will not be able to sign out . **This checking is done by verifying the jwt token sent with cookie .** 

     **Status : 403 Forbidden**
      ```json
      {
        "format": "*/*",
        "errors": [
            "Sign in First And Then Try Again!"
        ]
      }
     ```

   <br>

## <h2 id = 'blogapi' > 3.2 Blog Related Endpoints </h2> <br>

   
- ### <h3 id = 'getallblogs'> 3.2.1 Get All Blogs : &nbsp;  **GET &nbsp; /api/blogs/** </h2> <br><br> 

  - #### **Valid Response**: <br><br>
  
     if there exists atleast one blog then response will be okay with a status code **200 OK** along with a response . By default the response will be in **json** format but you can ask the response in **xml** format . For this we need to set **Accept** header to **application/xml** then  it will return a **xml** file . 
  
     **Status : 200 OK**
     ```json
     {
      "format": "*/*",
      "data": [
          {
              "username": "jagonmoy",
              "blogDescription": "A Story with some Description"
              "blogHeadline": "A Story Hedline",
              "createdAt": "2021-11-29T12:29:46.596Z",
              "updatedAt": "2021-11-30T14:35:52.576Z",
              "_id": "61a4c7baf49f6e294c05e7ef"
          },
          {
              "username": "steve",
              "blogDescription": "একটা সংখ্যা n কে আমরা মৌলিক সংখ্যা বলে ডাকতে পারি যদি সংখ্যাটাকে শুধু 1 আর n দিয়ে নি:শেষে ভাগ করা যায়।",
              "blogHeadline": "মৌলিক সংখ্যা",
              "createdAt": "2021-11-29T12:27:05.608Z",
              "updatedAt": "2021-12-08T19:46:46.505Z",
              "_id": "61a4c719f49f6e294c05e793"
          },
      ]
     }
     ```
   <br>

  - #### **Blogs Not Found Error**: <br><br>

    Suppose if there exists no blog then the status code will be **404 Not Found**

    **Status : 404 Not Found**
    
    ```json
    {
      "format": "*/*",
      "errors": [
          "blogs do not exist"
       ]
    }
    ```

  
<br>

- ### <h3 id = 'getblog'> 3.2.2 Get a Blog : &nbsp;  **GET &nbsp; /api/blogs/id/** </h2> <br><br> 

  - #### **Valid Response**: <br><br>
  
     if there exists a blog which has **_id** equals to the **:id** in url then response will be okay with a status code **200 OK** along with a response . By default the response will be in **json** format but you can ask the response in **xml** format . For this we   need to set **Accept** header to **application/xml** then  it will return a **xml** file . 
  
     **Status : 200 OK**
     ```json
     {
         "format": "*/*",
         "data": {
             "username": "jagonmoy",
             "blogDescription": "A Short Description of a Story",
             "blogHeadline": "A Headline of a Story",
             "createdAt": "2021-11-29T12:29:46.596Z",
             "updatedAt": "2021-11-30T14:35:52.576Z",
             "_id": "61a4c7baf49f6e294c05e7ef"
         }
     }
     ```
   <br>

  - #### **Blogs Not Found Error**: <br><br>

    Suppose if there exists no blog matching this **:id** then the status code will be **404 Not Found**

    **Status : 404 Not Found**
    
    ```json
    {
      "format": "*/*",
      "errors": [
          "blogs doesnot exist"
       ]
    }
    ```
    <br>

- ### <h3 id = 'createblog'> 3.2.3 Create Blog : &nbsp;  **POST &nbsp; /api/blogs/** </h2> <br><br> 

  - #### **Valid Response**: <br><br>
     
      A sample request body can be like this , <br><br>
     ```json
      {
        "blogDescription": "A Short Description of a Story",
        "blogHeadline": "A Headline of a Story",
      }
     ```
     <br>

    - If a person is signed in which can be measured by **verifying JWT token sent with cookie**  
    - If values of all the fields are passing validations.
    <br><br>
  
     then response will be okay with a status code **201 Created** along with a response . By default the response will be in **json** format but you can ask the response in **xml** format . For this we   need to set **Accept** header to **application/xml** then  it will return a **xml** file . 
  
     **Status : 201 Created**
     ```json
     {
       "format": "*/*",
       "data": {
          "_id": "61b19f53a8f6fa3eda8bcf93",
          "blogDescription": "A Short Description of a Story",
          "blogHeadline": "A Headline of a Story",
          "username": "jagoth",
          "createdAt": "2021-12-09T06:16:51.438Z",
          "updatedAt": "2021-12-09T06:16:51.438Z",
          "__v": 0
       }
     }
     ```
   <br>

  - #### **Not Signed in User Trying to Create Blog Error**: <br><br>

    Suppose a person who is not signed in trying to create a blog he will face a error which can be measured by **verifying JWT token sent with cookie**

    **Status : 401 Not Authorized**
    
    ```json
    {
        "format": "*/*",
        "errors": [
            "You are not logged in"
        ]
    }
    ```
    <br>
  - #### **validation Error**: <br><br>

    **Conditions for validations are :**
    - blogHeadline must be atleast 5 letters 
    - blogDescription must be atleast 10 letters 
    <br><br>

    if above conditions are not met then response will be a error along with a **422 Unprocessable Entity** status code . <br>
    suppose, blog headline is less than 5 letters.

    **Status : 422 Unprocessable Entity**
    
    ```json
    {
      "message": "request failed",
      "errors": [
        "Headline must have atleast 5 letters",
      ]
    }
    ```

  
<br>

- ### <h3 id = 'updateblog'> 3.2.4 Update Blog : &nbsp;  **PATCH &nbsp; /api/blogs/:id** </h2> <br><br> 

  - #### **Valid Response**: <br><br>
     
      A sample request body can be like this , <br><br>
     ```json
      {
        "blogDescription": "A Short Description of a Story updated",
        "blogHeadline": "A Headline of a Story",
      }
     ```
     <br>

    - If a person is signed in which can be measured by **verifying JWT token sent with cookie**  
    - If a blog exists with a **_id** similar to the **:id** in url
    - If a person who is signed in is the author of the blog
    - If values of all the fields are passing validations.
    <br><br>
  
     then response will be okay with a status code **200 OK** along with a response . By default the response will be in **json** format but you can ask the response in **xml** format . For this we   need to set **Accept** header to **application/xml** then  it will return a **xml** file . 
  
     **Status : 200 OK**
     ```json
     {
       "format": "*/*",
       "data": {
          "username": "jagoth",
          "blogDescription": "A Short Description of a Story updated",
          "blogHeadline": "A Headline of a Story",
          "createdAt": "2021-12-09T06:16:51.438Z",
          "updatedAt": "2021-12-09T07:11:52.765Z",
          "_id": "61b19f53a8f6fa3eda8bcf93"
       }
     }
     ```
   <br>

  - #### **Not Signed in User Trying to update Blog Error**: <br><br>

    Suppose a person who is not signed in trying to update a blog he will face a error which can be measured by **verifying JWT token sent with cookie**

    **Status : 401 Not Authorized**
    
    ```json
    {
        "format": "*/*",
        "errors": [
            "You are not logged in"
        ]
    }
    ```
    <br>
  - #### **validation Error**: <br><br>

    **Conditions for validations are :**
    - blogHeadline must be atleast 5 letters 
    - blogDescription must be atleast 10 letters 
    <br><br>

    if above conditions are not met then response will be a error along with a **422 Unprocessable Entity** status code . <br>
    suppose, blog headline is less than 5 letters.

    **Status : 422 Unprocessable Entity**
    
    ```json
    {
      "message": "request failed",
      "errors": [
        "Headline must have atleast 5 letters",
      ]
    }
    ```
  - #### **Blog Not Found Error** <br><br>

    suppose the blog you are tyring to update doesnot exists then you will get an error with a status code **404 Not Found**

     **Status : 404 Not Found**

     ```json
    {
      "format": "*/*",
      "errors": [
          "blogs doesnot exist"
       ]
    }
    ```
  - #### **Not Have Permission to Update Error** <br><br>

    Supose you are not the author of a blog then you will face an error with a status code **403 Forbidden** if you try to update a blog

    **Status : 403 Forbidden**

    ```json
    {
        "format": "*/*",
        "errors": [
            "Not Have permission to Update"
        ]
    }
    ```
  
<br>

- ### <h3 id = 'deleteblog'> 3.2.5 Delete Blog : &nbsp;  **DELETE &nbsp; /api/blogs/:id** </h2> <br><br> 

  - #### **Valid Response**: <br><br>
     
    - If a person is signed in which can be measured by **verifying JWT token sent with cookie**  
    - If a blog exists with a **_id** similar to the **:id** in url
    - If a person who is signed in is the author of the blog
    <br><br>
  
     then response will be okay with a status code **200 OK** along with a response . By default the response will be in **json** format but you can ask the response in **xml** format . For this we   need to set **Accept** header to **application/xml** then  it will return a **xml** file . 
  
     **Status : 200 OK**
     ```json
     {
        "format": "*/*",
        "data": "Blog Deleted"
     }
     ```
   <br>

  - #### **Not Signed in User Trying to Delete Blog Error**: <br><br>

    Suppose a person who is not signed in trying to delete a blog he will face a error which can be measured by **verifying JWT token sent with cookie**

    **Status : 401 Not Authorized**
    
    ```json
    {
        "format": "*/*",
        "errors": [
            "You are not logged in"
        ]
    }
    ```
    <br>
  - #### **Blog Not Found Error** <br><br>

    suppose the blog you are tyring to delete doesnot exists then you will get an error with a status code **404 Not Found**

     **Status : 404 Not Found**

     ```json
    {
      "format": "*/*",
      "errors": [
          "blogs doesnot exist"
       ]
    }
    ```
  - #### **Not Have Permission to Delete Error** <br><br>

    Supose you are not admin user and you are also not the author of a blog then you will face an error with a status code **403 Forbidden** if you try to delete the blog

    **Status : 403 Forbidden**

    ```json
    {
        "format": "*/*",
        "errors": [
            "Not Have permission to delete"
        ]
    }
    ```
  
<br>

## <h2 id = 'userapi' > 3.3 User Related Endpoints </h2> <br>

- ### <h3 id = 'getallusers'> 3.3.1 Get All Users : &nbsp;  **GET &nbsp; /api/users/** </h2> <br><br> 

  - #### **Valid Response**: <br><br>
  
     if there exists atleast one user then response will be okay with a status code **200 OK** along with a response . By default the response will be in **json** format but you can ask the response in **xml** format . For this we need to set **Accept** header to **application/xml** then  it will return a **xml** file . 
  
     **Status : 200 OK**
     ```json
     {
         "format": "*/*",
         "data": [
            {
                "name": "Pushpita",
                "username": "Pushpita",
                "email": "pushpitadhar59@gmail.com",
                "createdAt": "2021-12-08T19:52:20.787Z",
                "updatedAt": "2021-12-08T19:52:20.787Z"
            },
            {
                "name": "jagoth",
                "username": "jagoth",
                "email": "jagoth@mail.com",
                "createdAt": "2021-12-08T10:10:34.740Z",
                "updatedAt": "2021-12-09T06:16:52.184Z"
            },
         ]
     }
     ```
   <br>

  - #### **Users Not Found Error**: <br><br>

    Suppose if there exists no user then the status code will be **404 Not Found**

    **Status : 404 Not Found**
    
    ```json
    {
      "format": "*/*",
      "errors": [
          "Users do not exist"
       ]
    }
    ```

  
<br>

- ### <h3 id = 'getuser'> 3.3.2 Get a User : &nbsp;  **GET &nbsp; /api/blogs/:username/** </h2> <br><br> 

  - #### **Valid Response**: <br><br>
  
     if there exists a user which has **username** equals to the **:username** in url then response will be okay with a status code **200 OK** along with a response . By default the response will be in **json** format but you can ask the response in **xml** format . For this we   need to set **Accept** header to **application/xml** then  it will return a **xml** file . 
  
     **Status : 200 OK**
     ```json
     {
         "format": "*/*",
         "data": {
             "name": "Pushpita",
             "username": "Pushpita",
             "email": "pushpitadhar59@gmail.com",
             "createdAt": "2021-12-08T19:52:20.787Z",
             "updatedAt": "2021-12-08T19:52:20.787Z"
         }
     }
     ```
   <br>

  - #### **user Not Found Error**: <br><br>

    Suppose if there exists no user matching this **:username** then the status code will be **404 Not Found**

    **Status : 404 Not Found**
    
    ```json
    {
      "format": "*/*",
      "errors": [
          "This Username doesnot exist"
       ]
    }
    ```
    <br>

- ### <h3 id = 'getuserblogs'> 3.3.3 Get blogs of a User : &nbsp;  **GET &nbsp; /api/blogs/:username/myblog** </h2> <br><br> 

  - #### **Valid Response**: <br><br>
  
     if there exists a user which has **username** equals to the **:username** in url and the user has atleast one blog then response will be okay with a status code **200 OK** along with a response . By default the response will be in **json** format but you can ask the response in **xml** format . For this we   need to set **Accept** header to **application/xml** then  it will return a **xml** file . 
  
     **Status : 200 OK**
     ```json
     {
         "format": "*/*",
         "data": [
             {
                 "_id": "61a4c719f49f6e294c05e793",
                 "blogHeadline": "মৌলিক সংখ্যা",
                 "blogDescription": "একটা সংখ্যা n কে আমরা মৌলিক সংখ্যা বলে ডাকতে পারি যদি সংখ্যাটাকে শুধু 1 আর n দিয়ে নি:শেষে ভাগ করা যায়।",
                 "username": "steve",
                 "createdAt": "2021-11-29T12:27:05.608Z",
                 "updatedAt": "2021-12-08T19:46:46.505Z",
                 "__v": 0
             },
            {
                "_id": "61a4c6c2f49f6e294c05e783",
                "blogHeadline": "কম্পিউটার বিজ্ঞান",
                "blogDescription": "“আলকেমিস্ট” বইয়ের রুটিওয়ালা স্বপ্ন দেখতো পর্যটক হবার। কিন্তু সেই স্বপ্নকে সত্যি করার জন্য রাখালবালক হয়ে দেশবিদেশ ঘুরে না বেড়িয়ে সে স্বপ্নকে চাপা দিয়েছিলো কারণ মানুষের চোখে রুটিওয়ালার জীবন রাখালবালকের থেকে বেশি সম্মানের। ",
                "username": "steve",
                "createdAt": "2021-11-29T12:25:38.567Z",
                "updatedAt": "2021-11-29T12:25:38.567Z",
                "__v": 0
            }
       
        ]
     }
     ```
   <br>

  - #### **user Not Found Error**: <br><br>

    Suppose if there exists no user matching this **:username** then the status code will be **404 Not Found**

    **Status : 404 Not Found**
    
    ```json
    {
      "format": "*/*",
      "errors": [
          "This Username doesnot exist"
       ]
    }
    ```
    <br>
  - #### **Blogs Not Found for the user**: <br><br>

    Suppose if there exists no blog for a user then the status code will be **404 Not Found**

    **Status : 404 Not Found**
    
    ```json
    {
      "format": "*/*",
      "errors": [
          "blogs do not exist"
       ]
    }
    ```
    <br>
