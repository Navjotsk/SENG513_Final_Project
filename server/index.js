const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const pool = require("./db"); 

app.use(cors());
app.use(express.json()); 

let food = {
  numPlayers: 0,
  count: 1000
}
let sport = {
  numPlayers: 0,
  count: 2000
}
let school = {
  numPlayers: 0,
  count: 3000
}
let anime = {
  numPlayers: 0,
  count: 4000
}
let games = {
  numPlayers: 0,
  count: 5000
}
let fantasy = {
  numPlayers: 0,
  count: 6000
}

const calcCount = (arg) => {
  let count;
  if (arg == 'food') {
    food.numPlayers++;
    if ((food.numPlayers + 1)%2 == 0) food.count++;
    count = food.count;
  }
  else if (arg == 'sport') {
    sport.numPlayers++;
    if ((sport.numPlayers + 1)%2 == 0) sport.count++;
    count = sport.count;
  }
  else if (arg == 'school') {
    school.numPlayers++;
    if ((school.numPlayers + 1)%2 == 0) school.count++;
    count = school.count;
  }
  else if (arg == 'anime') {
    anime.numPlayers++;
    if ((anime.numPlayers + 1)%2 == 0) anime.count++;
    count = anime.count;
  }
  else if (arg == 'games') {
    games.numPlayers++;
    if ((games.numPlayers + 1)%2 == 0) games.count++;
    count = games.count;
  }
  else if (arg == 'fantasy') {
    fantasy.numPlayers++;
    if ((fantasy.numPlayers + 1)%2 == 0) fantasy.count++;
    count = fantasy.count;
  }
  return count;
}

const server = http.createServer(app);
const PORT = 5000;
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log( socket.client.conn.server.clientsCount + " users connected" );

  socket.on("joinRoom", (data) => {
    socket.join(data);
    console.log(`User Joined: ${data}`)
  });

  socket.on("joinGame", (data) => {
    let currCount = calcCount(data.topic);
    socket.join(currCount);
    socket.emit("gameJoined", {room: currCount});
  });

  socket.on("typeGame", (data) => {
    socket.to(data.room).emit("receivedType", {id: data.id, content: data.content});
  });

  socket.on("sendMessage", (data) => {
    socket.to(data.room).emit("receivedMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("A User disconnected")
    console.log( socket.client.conn.server.clientsCount + " users connected" );
  });
});

//DATABASE ROUTES

//get all madlib rows from db
app.get("/madlibs", async (req, res) => {
  try {
    const allMadlibs = await pool.query("SELECT * FROM madlibs");
    res.json(allMadlibs.rows);
    console.log(allMadlibs.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//get madlib row by id ex. /madlibs/1
app.get("/madlibs/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const madlib = await pool.query("SELECT * FROM madlibs WHERE id = $1", [
      id,
    ]);

    res.json(madlib.rows[0]);
    console.log(madlib.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//EXAMPLE CODE TO GET MADLIB, COULD USE THIS IN YOUR REACT FILE:
/*const [madLib, setMadlib] = useState([]);
  let id = 1; //the madlib u want to retreive
  const getMadLib = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/madlibs/${id}`);
      const jsonData = await response.json();
      setMadlib(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };*/

server.listen(PORT, () => {
  console.log("SERVER IS RUNNING on PORT ", PORT);
});
