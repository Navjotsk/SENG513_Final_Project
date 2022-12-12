const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const pool = require("./db"); 
const e = require("express");

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
  let first = false;
  if (arg == 'food') {
    food.numPlayers++;
    if ((food.numPlayers + 1)%2 == 0) {
      food.count++;
      first = true;
    }
    count = food.count;
  }
  else if (arg == 'sport') {
    sport.numPlayers++;
    if ((sport.numPlayers + 1)%2 == 0) {
      sport.count++;
      first = true;
    }
    count = sport.count;
  }
  else if (arg == 'school') {
    school.numPlayers++;
    if ((school.numPlayers + 1)%2 == 0) {
      school.count++;
      first = true;
    }
    count = school.count;
  }
  else if (arg == 'anime') {
    anime.numPlayers++;
    if ((anime.numPlayers + 1)%2 == 0) {
      anime.count++;
      first = true;
    }
    count = anime.count;
  }
  else if (arg == 'games') {
    games.numPlayers++;
    if ((games.numPlayers + 1)%2 == 0) {
      games.count++;
      first = true;
    }
    count = games.count;
  }
  else if (arg == 'fantasy') {
    fantasy.numPlayers++;
    if ((fantasy.numPlayers + 1)%2 == 0) {
      fantasy.count++;
      first = true;
    }
    count = fantasy.count;
  }
  return {roomNum: count, firstPlayer: first};
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
    socket.join(currCount.roomNum);
    if (data.opponent !=null) {
      socket.emit("gameJoined", {room: currCount.roomNum, first: currCount.firstPlayer});
      socket.broadcast.emit("requestedToJoin", {user: data.opponent, room: currCount.roomNum});
    } else {
      socket.emit("gameJoined", {room: currCount.roomNum, first: currCount.firstPlayer});
    }
    if (currCount.firstPlayer == false) socket.to(currCount.roomNum).emit("playerJoined");
  });

  socket.on("typeGame", (data) => {
    socket.to(data.room).emit("receivedType", {id: data.id, content: data.content});
  });

  socket.on("finishGame", (data) => {
    socket.to(data.room).emit("otherFinish");
  });

  socket.on("sendMessage", (data) => {
    socket.to(data.room).emit("receivedMessage", data.text);
  });

  socket.on("disconnect", () => {
    console.log("A User disconnected")
    console.log( socket.client.conn.server.clientsCount + " users connected" );
  });

   socket.on("startGame", (data) => {
     console.log("got request to start game with" + data.user2ID.toString());
   });

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

server.listen(PORT, () => {
  console.log("SERVER IS RUNNING on PORT ", PORT);
});
