# Welcome to MadLibs!

# Introduction
Madlibs is a multiplayer game where two players can fill out unfinished words in a specific text. The text have a theme associated with it such as school, food or sports. Users can either play as a guest or a registered account. Guest accounts will join a game and the game room will pair up other guests to start a game. Registered users have their own profile and can add friends with whom they can start a game with.

The frontend is built in React.Js and the backend is done with Express.Js and Socket.IO.


To run the project on a computer, the following steps need to be followed:

1. Clone the repository, cd into the project folder.
```
git clone https://github.com/Navjotsk/SENG513_Final_Project.git
```
2. Import and clone the PostgreSQL Database. Use command:
```
psql -U {super_user_name} {name_of_db} < /path/to/ProjectDB.sql
```
3. Open two command prompts. In the first terminal, cd into the client folder. In the second terminal, cd into the backend folder.
4. In the backend terminal, run ```npm install``` which will install the node modules for the backend. After the installation, run the command ```node index.js```. This will start a server on ```localport 5000```.
5. In the client terminal, run ```npm i``` which will install all of the node modules. After the installation run the command ```npm start```
6. Open a new window in the browser and type ```localhost/3000```. This will start a second react client which will mimic the multiplayer game.

# Screenshots

## Main Menu
![image](https://user-images.githubusercontent.com/77874716/207710333-55ed0aae-aefb-4959-9d99-aaf68524ba33.png)

## Waiting Lobby
![image](https://user-images.githubusercontent.com/77874716/207710945-efaf45d6-ad2c-4eed-8890-9b32dc53c581.png)

## Login
![image](https://user-images.githubusercontent.com/77874716/207712465-644b1e81-916e-456a-a5c7-7c18ec343bee.png)

## Register
![image](https://user-images.githubusercontent.com/77874716/207712803-147933a1-9211-4697-8b89-dbf2f9f62772.png)

## Gameplay + Chatbox











