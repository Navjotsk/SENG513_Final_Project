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
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport")
const initializePassport = require("./passportConfig")
initializePassport(passport);



const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());
app.use(express.json())

app.use(cors());

app.use(session({
  secrect: "secret",
  resave: false,
  saveUninitialized: false,
}))

app.use(flash());

app.use(passport.session);
app.use(passport.initialize());




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

  class User {
    constructor(id, email, password) {
      this.id = id;
      this.email = email;
      this.password = password;
    }
  }


  // recieveing email and password for each user then assign id to them and create object user to save it to database
  console.log(req.body)
  let userId = makeid(5);
  let userEmail = req.body.email
  let userPassword = req.body.password
  let userPassword2 = req.body.password2


  const user = new User(userId, userEmail, userPassword);

  // if name or password fields are not sent to the server, then show error
  let errors = [];
  if (!email || !password) {
    errors.push({ message: "Please enter  all the fields" })
  }
  // if two passwords do not match show error
  if (userPassword != userPassword2) {
    errors.push({ message: "Passwords do not match" })
  }

  if (errors.length > 0) {
    res.jsonp({ error: errors })
  }
  else {
    // Form validation has passed
    let hasshedPassword = await bcrypt.hash(userPassword, 10);


    // if Emailed has already registered show error
    pool.query(
      `SELECT * FROM users 
      WHERE email = $1`,
      [userEmail],
      (err, results) => {
        if (err) {
          throw err
        }
        console.log(results.row)

        if (results.row.length > 0) {
          errors.push({ message: "Email Already Exists" })
          res.jsonp({ error: errors })



        }
        else {
          pool.query(`INSERT INTO users (email, password) VALUES($1, $2) RETURNING *`[userEmail, hasshedPassword]).catch(err => console.log(err))
          res.send("You have registered!")

          // redirect to the login page (?) need to fix this
          // await res.redirect(/login.htlm)




        }


      }



    )






  }




  // res.jsonp({ userid: userId })
})


app.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login"


}) {


  res.jsonp({})
})



// app.post("/login", async function (req, res, next) {


//   res.jsonp({})
// })










/// This fuction creates unique userIDs
function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
