const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const pool = require("./db");

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const PORT = 5000;
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.client.conn.server.clientsCount + " users connected");

  socket.on("joinRoom", (data) => {
    socket.join(data);
    console.log(`User Joined: ${data}`);
  });

  socket.on("sendMessage", (data) => {
    socket.to(data.room).emit("receivedMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("A User disconnected");
    console.log(socket.client.conn.server.clientsCount + " users connected");
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
