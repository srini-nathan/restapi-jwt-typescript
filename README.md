# Simple API with JWT

This is a simple practical exercise of a API with JWT, using nodeJS, express, JWT, mongoDB with Typescript

## Considerations
* You must have NodeJS, npm and mongoDB installed in your computer.
* This project is only a practical exercise and should not be used in production.

## Installation

Clone the repository in your computer.
```git
git clone https://github.com/srini-nathan/restapi-jwt-typescript.git
``` 
Move into the folder folder and install all the dependencies`.
```bash
cd restapi-jwt-typescript
npm install
```
Create environment variables
```bash
JWT_TOKEN_SECRET # To encrypt the token
```

You can create the variables from your terminal or create an ``` .env ``` file and put them like this:

```bash
SECRET_KEY=secret123
```
Start the mongoDB server (in debian distributions).

```bash
sudo systemctl start mongod
```

You can see how to start the mongoDB service in your OS in the [documentation](https://docs.mongodb.com/manual/administration/install-community/).

#
Finally, start the server with the command ``` npm start ```.

## Usage
The project has 3 URL ``` /profile ```, ``` /signin ``` and ``` /signup ```. For example:

``` bash
http://localhost:4000/api/auth/signin # Method POST
# To get the token, send an email and password

http://localhost:4000/api/auth/profile # Method GET
# To get the user data, send header "auth-token" with the token returned in the sing in.

http://localhost:4000/api/auth/singup # Method POST
# Register user, send the data: username, email and password
```