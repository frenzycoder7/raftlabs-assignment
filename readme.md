## Information
This project requires [Node.js](https://nodejs.org/) v10+ to run.
> API DOCS - [https://documenter.getpostman.com/view/11583515/2s93JxqLLh](https://documenter.getpostman.com/view/11583515/2s93JxqLLh) or `You can import "exported postman collection with env" located in postman_data folder in project`

> Note - `Docker should be installed on your system`

## Features

- CHAT ROOMS
- REAL-TIME RESOURCE UPDATE USING SOCKET.IO
- RESOURCES CREATE, UPDATE, DELETE and GET
- MULTIPLE FILTER OPTIONS ON GET API OF RESOURCES
- AUTHORIZED APIs AND SOCKET CONNECTIONS


## INSTALL & SETUP 

> Step 1: Clone project
```sh
    git clone https://github.com/frenzycoder7/raftlabs-assignment.git
```
> Step 2: Navigate to Project Folder & Install dependencies and devDependencies 
```sh
cd raftlabs-assignment 
```
for dependencies 
```sh
npm i 
```
for devDependencies
```sh
npm i -D 
```

> Step3: Setup docker for you project
`This project have docker-compose.yml file which can used for setup docker for this project. You just have to run this command.`
```sh
    docker-compose up -d
```
> Step 4: Setup done now you can run this project in dev or production mode

`For dev mode just run`
`port for this mode will be 7002`
```sh
npm run dev
```
`For Production mode just run`
`This will run this project in production and port will be 7001`
```sh
npm start
```