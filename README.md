# Hackathon1.0

HOW TO RUN APPLICATION :
For UI :
Inside Hackathon1.0/HackathonUI/
  1. npm install
  2. ng serve to start server

For Middleware:
  1. Create a virtual env
  2. Install the dependecies in requirements.txt
  3. To create db change the configuration in config.py DevelopmentConfig and run python3 manage.py create_db
  3. To start server python3 manage.py runserver
 


Repository For Hackathon



#API INFO

***** BASE URL ******

https://ELEMONEATERS.pythonanywhere.com

***** USER LOGIN *****

  url : api/1.0/login
  
  request_keys: user_id, user_password
  
  type: POST

***** ALL MODULES *****

  url : api/1.0/modules/all
  
  request_keys: None
  
  type: GET
  
***** REGISTERED MODULES *****

  url : api/1.0/modules/registered
  
  request_keys: user_id
  
  type: POST
