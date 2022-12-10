import io from "socket.io-client";
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const socket = io.connect("http://localhost:5000");

function ChatBox() {
  //Joining a room
  const [room, setRoom] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  //Messages
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");
 

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("joinRoom", room);
    }
    setIsJoined(true);
  };

  const sendMessage = () => {
    socket.emit("sendMessage", { message, room });
  };

  useEffect(() => {
    socket.on("receivedMessage", (data) => {
      setReceivedMessage(data.message);
    });
  }, [socket]);


  
  return (
    <div className="chatBox">
    <TextField id="outlined-basic" label="Outlined"  variant="outlined"  size="small" onChange={(event) => {
          setRoom(event.target.value);
        }}  />
   
    <Button variant="contained" onClick={joinRoom}>Join Room</Button>    
      <TextField id="outlined-basic" label="Outlined" variant="outlined"  size="small" onChange={(event) => {
          setMessage(event.target.value);
        }}  />
           
    <Button variant="contained" onClick={sendMessage}>Send Message</Button>
      {isJoined? <h1>Currently Playing in Room : {room}</h1>:<h1> Please Join a Room: </h1>}
      {receivedMessage}
     
    </div>
  );
}

export default ChatBox;
