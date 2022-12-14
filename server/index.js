const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
// const pool = require("./db");
const { pool } = require("./DbConfig");
const bcrypt = require("bcrypt");
const tokenVerifier = require("./token_verification");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const server = http.createServer(app);
const PORT = 5000;
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
server.listen(PORT, () => {
  console.log("SERVER IS RUNNING on PORT ", PORT);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

pool.connect((err) => {
  //Connected Database

  if (err) {
    console.log(err);
  } else {
    console.log("Data logging initiated!");
  }
});

// objects to keep count of the room numbers for the games
// food topic rooms
let food = {
  numPlayers: 0,
  count: 1000
}
// sport topic rooms
let sport = {
  numPlayers: 0,
  count: 2000
}
// school topic rooms
let school = {
  numPlayers: 0,
  count: 3000
}
//animal topic rooms
let anime = {
  numPlayers: 0,
  count: 4000
}
// games topic rooms
let games = {
  numPlayers: 0,
  count: 5000
}
// fantasy topic rooms
let fantasy = {
  numPlayers: 0,
  count: 6000
}
// room for requests
let request = {
  numPlayers: 0,
  count: 7000
}

// calculate the room numbers
const calcCount = (arg) => {
  let count;
  // the player currently requesting the room number is not the first player
  let first = false;
  // if the topic chosen is food
  if (arg == 'food') {
    // add one to the number of players
    food.numPlayers++;
    // if the current number of players is odd
    if ((food.numPlayers + 1)%2 == 0) {
      // add one to the room number count
      food.count++;
      // the current player is the first player in the room
      first = true;
    }
    // assign room number to count
    count = food.count;
  }
  // if the topic chosen is sport
  else if (arg == 'sport') {
    sport.numPlayers++;
    if ((sport.numPlayers + 1)%2 == 0) {
      sport.count++;
      first = true;
    }
    count = sport.count;
  }
  // if the topic chosen is school
  else if (arg == 'school') {
    school.numPlayers++;
    if ((school.numPlayers + 1)%2 == 0) {
      school.count++;
      first = true;
    }
    count = school.count;
  }
  // if the topic chosen is animal
  else if (arg == 'animal') {
    anime.numPlayers++;
    if ((anime.numPlayers + 1)%2 == 0) {
      anime.count++;
      first = true;
    }
    count = anime.count;
  }
  // if the topic chosen is games
  else if (arg == 'games') {
    games.numPlayers++;
    if ((games.numPlayers + 1)%2 == 0) {
      games.count++;
      first = true;
    }
    count = games.count;
  }
  // if the topic chosen is fantasy
  else if (arg == 'fantasy') {
    fantasy.numPlayers++;
    if ((fantasy.numPlayers + 1)%2 == 0) {
      fantasy.count++;
      first = true;
    }
    count = fantasy.count;
  }
  // if the game is by request
  else if (arg == 'request') {
    request.numPlayers += 2;
    request.count++;
    first = true;
    count = request.count;
  }
  return {roomNum: count, firstPlayer: first};
}

io.on("connection", (socket) => {
  console.log( socket.client.conn.server.clientsCount + " users connected" );

  // player request to join game
  socket.on("joinGame", (data) => {
    // if the current player if not joining a game using room number
    if (data.topic != 'joinRequest') {
      // calculate room number
      let currCount = calcCount(data.topic);
      socket.join(currCount.roomNum);
      // if it's a game with designated player
      if (data.opponent != null) {
        socket.emit("gameJoined", {room: currCount.roomNum, first: currCount.firstPlayer});
        socket.broadcast.emit("requestedToJoin", {user: data.opponent, room: currCount.roomNum, requestor: data.requestor});
      } 
      // if it's a game with random players
      else {
        socket.emit("gameJoined", {room: currCount.roomNum, first: currCount.firstPlayer});
      }
      // if current player joining is not the first player, tell the first player that a player has joined
      if (currCount.firstPlayer == false) socket.to(currCount.roomNum).emit("playerJoined");
    }
    // player already has rrom number
    else {
      // join the room
      socket.join(Number(data.room));
      // confirm the player joined room
      socket.emit("gameJoined", {room: Number(data.room), first: false});
      // tells player already room that another player has joined
      socket.to(Number(data.room)).emit("playerJoined");
    }
    
  });

  // tell other client in room that the madlib input has been type in
  socket.on("typeGame", (data) => {
    socket.to(data.room).emit("receivedType", {id: data.id, content: data.content});
  });

  // tell client in the room that other player has finished
  socket.on("finishGame", (data) => {
    socket.to(data.room).emit("otherFinish");
  });

  // send message to client
  socket.on("sendMessage", (data) => {
    socket.to(data.room).emit("receivedMessage", data.text);
  });

  // socket disconnected
  socket.on("disconnect", () => {
    console.log("A User disconnected")
    console.log( socket.client.conn.server.clientsCount + " users connected" );
  });

  socket.on("startGame", (data) => {
    console.log("got request to start game with" + data.user2ID.toString());
  });

  // got a friend request
  socket.on("friendRequest", (data) => {
    socket.broadcast.emit("requestedFriend", data);
    console.log(data.user);
    console.log(data.requestor);
  });
});

//DATABASE ROUTES

//get all madlib rows from db
app.get("/madlibs", async (req, res) => {
  try {
    const allMadlibs = await pool.query("SELECT * FROM madlibs");
    res.json(allMadlibs.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//get madlib row by id ex. /madlibs/1
app.get("/madlibs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const madlib = await pool.query("SELECT * FROM madlibs WHERE id = $1", [
      id,
    ]);

    res.json(madlib.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/register", async function (req, res, next) {
  // recieveing email and password for each user then assign id to them and create object user to save it to database
  console.log(req.body);

  let userEmail = req.body.email;
  let username = req.body.username;
  let userPassword = req.body.password;
  console.log(userEmail, username, userPassword);

  // if name or password fields are not sent to the server, then show error

  let errors = [];
  if (!userEmail || !userPassword) {
    errors.push({ message: "Please enter  all the fields" });
  }
  if (errors.length > 0) {
    res.jsonp({ error: errors });
  } else {
    // Form validation has passed
    let hashedPassword = await bcrypt.hash(userPassword, 10);

    // if Emailed has already registered show error
    pool.query(
      `SELECT * FROM users 
      WHERE email = $1`,
      [userEmail],
      async (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results.rows);

        if (results.rows.length > 0) {
          errors.push({ message: "Email Already Exists" });
          res.jsonp({ error: errors });
        } else {
          console.log(userEmail, hashedPassword);
          await pool.query(
            "INSERT INTO users(email, password, username) VALUES($1, $2, $3);",
            [userEmail, hashedPassword, username]
          );
          const data = await pool.query(
            `SELECT * FROM users WHERE email= $1;`,
            [userEmail]
          ); //retreiving userID from database
          let user = data.rows;
          let userId = data.rows[0].id;
          const token = jwt.sign(
            //Signing a jwt token
            {
              email: userEmail,
              id: userId,
            },
            process.env.SECRET_KEY
          );
          await res.jsonp({ message: "You have registered!", userid: userId });
          // res.send("You have registered!")
        }
      }
    );
  }

  // res.jsonp({ userid: userId })
});

app.post("/login", async function (req, res, next) {
  let userEmail = req.body.email;
  let userPassword = req.body.password;

  try {
    const data = await pool.query(`SELECT * FROM users WHERE email= $1;`, [
      userEmail,
    ]); //Verifying if the user exists in the database
    let user = data.rows;
    let userId = data.rows[0].id;
    if (user.length === 0) {
      res.status(400).json({
        error: "User is not registered, Sign Up first",
      });
    } else {
      bcrypt.compare(userPassword, user[0].password, (err, result) => {
        //Comparing the hashed password
        if (err) {
          res.status(500).json({
            error: "Server error",
          });
        } else if (result === true) {
          //Checking if credentials match
          const token = jwt.sign(
            {
              email: userEmail,
              id: userId,
            },
            process.env.SECRET_KEY
          );
          res.status(200).json({
            message: "User signed in!",
            token: token,
            userid: userId,
          });
        } else {
          //Declaring the errors
          if (result != true)
            res.status(400).json({
              error: "Enter correct password!",
            });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }

  // res.jsonp({})
});

app.post("/profile", tokenVerifier, async function (req, res, next) {
  //  browser sends token >> server decodes token and gets userid
  let userId = req.tokenData.id;

  // server sends username,list of freinds, gameplayed
  const data = await pool.query(`SELECT * FROM users WHERE id= $1;`, [userId]);

  let username = data.rows[0].username;
  let gameplayed = data.rows[0].gameplayed;
  const friendlist = await pool.query(
    `SELECT u2.username, u2.id FROM friends f 
    JOIN users u1 ON f.userid = u1.id 
    JOIN users u2 ON f.friendid = u2.id WHERE f.userid = $1;`,
    [userId]
  );
  console.log(friendlist.rows);
  res.json({
    friends: friendlist.rows,
    username: username,
    gameplayed: gameplayed,
    userID: userId,
  });
});

app.post("/removefriend", tokenVerifier, async function (req, res, next) {
  //  browser sends token >> server retrieves userid form token
  // server needs to get friend ID from browser
  let userId = req.tokenData.id;
  let friendId = req.body.friendID;
  console.log(userId);
  console.log(friendId);
  // test:
  // let userId = 1;
  // let friendId = 4;
  let data = await pool.query(`SELECT * FROM users WHERE id= $1;`, [
    friendId,
  ]);



  // if (data.rows.length === 0) {
  //   res.status(400).json({
  //     error: "User does not exist",
  //   });
  // }

  // else {
    await pool.query("DELETE FROM friends WHERE (userid = $1 AND friendid=$2);", [
      userId,
      friendId,
    ]);


    const friendlist = await pool.query(
      `SELECT u2.username, u2.id FROM friends f 
      JOIN users u1 ON f.userid = u1.id 
      JOIN users u2 ON f.friendid = u2.id WHERE f.userid = $1;`,
      [userId]
    );

    res.json({ friends: friendlist.rows });
    console.log(friendlist);
  // }

});

app.post("/addfriend", tokenVerifier, async function (req, res, next) {
  //  browser sends token >> server retrieves userid form token
  // server needs to get friend username from browser and finds friend ID from DB
  let userId = req.tokenData.id;
  let friendId = req.body.friendID;
  // let userId = 2;
  // let friendId = 10;
  let data = await pool.query(`SELECT * FROM users WHERE id= $1;`, [
    friendId,
  ]);

  if (data.rows.length === 0) {
    res.status(400).json({
      error: "User does not exist",
    });
  }

  else {


    await pool.query("INSERT INTO friends(userid, friendid) VALUES($1, $2);", [
      userId,
      friendId,
    ]);


    const friendlist = await pool.query(
      `SELECT u2.username, u2.id FROM friends f 
      JOIN users u1 ON f.userid = u1.id 
      JOIN users u2 ON f.friendid = u2.id WHERE f.userid = $1;`,
      [userId]
    );

    console.log(data.rows[0].username);
    res.json({ friends: friendlist.rows, friendusername: data.rows[0].username });
    console.log(friendlist);
  }

});

app.post("/deleteaccount", tokenVerifier, async function (req, res, next) {
  //decoding token recieved form browser

  let userId = req.tokenData.id;
  // let userId = 6;

  // deleting from table users will also deletes from friends(FK)
  await pool.query("DELETE FROM users WHERE id=$1;", [userId]);

  res.json("user has been removed from DB");
  // console.log("deleted")
});

app.post("/changedpassword", tokenVerifier, async function (req, res, next) {
  //decoding token recieved form browser

  let userId = req.tokenData.id;
  let newPassword = req.body.newpassword;
  // testing:
  // let newPassword = "1";
  // let userId = 6

  let newHashedPassword = await bcrypt.hash(newPassword, 10);

  await pool.query("UPDATE users SET password= $1 WHERE id=$2;", [
    newHashedPassword,
    userId,
  ]);

  await res.json("password has been changed!");
});

//get all madlib rows from db
app.get("/madlibs", async (req, res) => {
  try {
    const allMadlibs = await pool.query("SELECT * FROM madlibs");
    res.json(allMadlibs.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//get madlib row by id ex. /madlibs/1
app.get("/madlibs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const madlib = await pool.query("SELECT * FROM madlibs WHERE id = $1", [
      id,
    ]);

    res.json(madlib.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});
