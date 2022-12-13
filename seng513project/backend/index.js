const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const server = http.createServer(app);
const PORT = 5000;
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const { pool } = require("./DbConfig");
const bcrypt = require("bcrypt");
const tokenVerifier = require("./token_verification");

const jwt = require("jsonwebtoken");


pool.connect((err) => { //Connected Database

  if (err) {

    console.log(err);

  }

  else {

    console.log("Data logging initiated!");
  }

});


const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());
app.use(express.json())

app.use(cors());




io.on("connection", (socket) => {
  console.log(socket.client.conn.server.clientsCount + " users connected");

  socket.on("joinRoom", (data) => {
    socket.join(data);
    console.log(`User Joined: ${data}`)
  });

  socket.on("sendMessage", (data) => {
    socket.to(data.room).emit("receivedMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("A User disconnected")
    console.log(socket.client.conn.server.clientsCount + " users connected");
  });
});

server.listen(PORT, () => {
  console.log("SERVER IS RUNNING on PORT ", PORT);
});




app.post("/register", async function (req, res, next) {

  // class User {
  //   constructor(email, password) {
  //     // this.id = id;
  //     this.email = email;
  //     this.password = password;
  //   }
  // }


  // recieveing email and password for each user then assign id to them and create object user to save it to database
  console.log(req.body)
  // let userId = makeid(5);
  let userEmail = req.body.email
  let username = req.body.username
  let userPassword = req.body.password
  // let userPassword2 = req.body.password2


  // const user = new User(userEmail, userPassword);

  // if name or password fields are not sent to the server, then show error

  let errors = [];
  if (!userEmail || !userPassword) {
    errors.push({ message: "Please enter  all the fields" })
  }
  if (errors.length > 0) {
    res.jsonp({ error: errors })
  }
  else {
    // Form validation has passed
    let hashedPassword = await bcrypt.hash(userPassword, 10);



    // if Emailed has already registered show error
    pool.query(
      `SELECT * FROM users 
      WHERE email = $1`,
      [userEmail],
      async (err, results) => {
        if (err) {

          throw err
        }
        console.log(results.rows)

        if (results.rows.length > 0) {

          errors.push({ message: "Email Already Exists" })
          res.jsonp({ error: errors })



        }
        else {


          console.log(userEmail, hashedPassword)
          await pool.query('INSERT INTO users(email, password, username) VALUES($1, $2);', [userEmail, hashedPassword, username])
          const data = await pool.query(`SELECT * FROM users WHERE email= $1;`, [userEmail]) //retreiving userID from database
          let user = data.rows;
          let userId = data.rows[0].id
          const token = jwt.sign( //Signing a jwt token
            {
              email: userEmail,
              id: userId

            },
            process.env.SECRET_KEY
          );
          await res.send("You have registered!")





        }


      }



    )






  }




  // res.jsonp({ userid: userId })
})


app.post("/login", async function (req, res, next) {
  let userEmail = req.body.email
  let userPassword = req.body.password

  try {
    const data = await pool.query(`SELECT * FROM users WHERE email= $1;`, [userEmail]) //Verifying if the user exists in the database
    let user = data.rows;
    let userId = data.rows[0].id
    if (user.length === 0) {
      res.status(400).json({
        error: "User is not registered, Sign Up first",
      });
    }
    else {
      bcrypt.compare(userPassword, user[0].password, (err, result) => { //Comparing the hashed password
        if (err) {
          res.status(500).json({
            error: "Server error",
          });
        } else if (result === true) { //Checking if credentials match
          const token = jwt.sign(
            {
              email: userEmail,
              id: userId
            },
            process.env.SECRET_KEY
          );
          res.status(200).json({
            message: "User signed in!",
            token: token,
          });
        }
        else {
          //Declaring the errors
          if (result != true)
            res.status(400).json({
              error: "Enter correct password!",
            });
        }
      })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });

  }


  // res.jsonp({})
})

app.post("/profile", tokenVerifier, async function (req, res, next) {
  //  browser sends token >>retrieve userid form token
  let userId = req.tokenData.id

  // server sends username,list of freinds, gameplayed
  const data = await pool.query(`SELECT * FROM users WHERE id= $1;`, [userId])

  let username = data.rows[0].username;
  let gameplayed = data.rows[0].gameplayed;
  const friendlist = await pool.query(`SELECT u2.username, u2.id FROM friends f 
    JOIN users u1 ON f.userid = u1.id 
    JOIN users u2 ON f.friendid = u2.id WHERE f.userid = $1;`, [userId])
  console.log(friendlist.rows)
  res.json({ friends: friendlist.rows, username: username, gameplayed: gameplayed })

})

app.post("/removefriend", async function (req, res, next) {
  //  browser sends token >> server retrieves userid form token
  // server needs to get friend ID from browser
  let userId = req.tokenData.id
  let freindId = req.freindId
  // test:
  // let userId = 1;
  // let friendId = 12345;

  await pool.query('DELETE FROM friends WHERE (userid = $1 AND friendid=$2);', [userId, friendId])
  await pool.query('DELETE FROM friends WHERE (userid = $1 AND friendid=$2);', [friendId, userId])


  const friendlist = await pool.query(`SELECT u2.username, u2.id FROM friends f 
    JOIN users u1 ON f.userid = u1.id 
    JOIN users u2 ON f.friendid = u2.id WHERE f.userid = $1;`, [userId])

  res.json({ friends: friendlist.rows, })
  console.log(friendlist)

})


app.post("/addfriend", tokenVerifier, async function (req, res, next) {
  //  browser sends token >> server retrieves userid form token
  // server needs to get friend ID from browser
  let userId = req.tokenData.id
  let freindId = req.freindId

  // test:
  // let userId = 1;
  // let friendId = 12345;

  // we need to add thses two in database

  await pool.query('INSERT INTO friends(userid, friendid) VALUES($1, $2);', [userId, friendId])
  await pool.query('INSERT INTO friends(userid, friendid) VALUES($1, $2);', [friendId, userId])


  const friendlist = await pool.query(`SELECT u2.username, u2.id FROM friends f 
    JOIN users u1 ON f.userid = u1.id 
    JOIN users u2 ON f.friendid = u2.id WHERE f.userid = $1;`, [userId])

  res.json({ friends: friendlist.rows, })
  console.log(friendlist)

})

