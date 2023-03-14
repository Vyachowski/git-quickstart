## Configure base setting
--------------

### 1. Set up your name and email  

Run  
`git config --global user.name "Your name"`  
`git config --global user.email "your@email.com"`
    
### 2. Establish a cross-device compatibility  

##### For Mac/Linux

Run  
`git config --global core.autocrlf input`  
`git config --global core.safecrlf warn`

##### For Windows

Run  
`git config --global core.autocrlf true`  
`git config --global core.safecrlf warn`
