import './App.css';
import { useState, useEffect } from "react";
import Navbar from './components/NavBar';
import Main from './components/Main';
import Choice from './components/Choice';
import Game from './components/Game';
import Login from './components/Login';
import ChatBox from './components/ChatBox';
import UserPage from './components/UserPage'
import ClosedChat from './components/ClosedChat';

import io from 'socket.io-client';
const socket = io.connect("http://localhost:5000");

function App() {
  const [location, setLocation] = useState('main');
  const [room, setRoom] = useState(-1);
  const [ready, setReady] = useState(false);
  const [meReady, setMeReady] = useState(false);
  const [otherReady, setOtherReady] = useState(false);
  const [finish, setFinish] = useState(false);
  const [otherFinish, setOtherFinish] = useState(false);
  const [madLib, setMadlib] = useState([]);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);

  const [userID, setUserID] = useState("");
  const [opponent, setOpponent] = useState("");
  const [request, handleRequest] = useState(false);

  const joinGame = (data) => {
    if (opponent == null) {
      socket.emit("joinGame", {topic: data, opponent: null});
    } else {
      socket.emit("joinGame", {topic: data, opponent: opponent} )
    }
  };

  const typeGame = (data) => {
    socket.emit("typeGame", {id: data.id, content: data.content, room: room});

  };

  const finishGame = (data) => {
    setFinish(true)
    socket.emit("finishGame", {room: room});
  };

  const revealText = () => {
    let dom_span = document.querySelectorAll('.text-container span');
    let dom_input = document.querySelectorAll('.text-container input');
    for(let i = 0 ; i < dom_span.length ; i++) {
        dom_span[i].style.color = '#000000';
        dom_span[i].style.textShadow = 'none';
    }
    let story = madLib.story_sentence;
    for(let i = 0 ; i < dom_input.length ; i++) {
      dom_span[i].innerHTML = `${story[i]}<b>${dom_input[i].value}</b>`
    }
  }

  const finishToMain = () => {
    setLocation('main')
    setRoom(-1)
    setReady(false)
    setFinish(false)
    setOtherFinish(false)
    setMadlib([])
  }

  const getMadLib = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/madlibs/${id}`);
      const jsonData = await response.json();
      setMadlib(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const sendMessage = () => {
    if (input !== "") {
      socket.emit("sendMessage", { text: input, room: room });
      addMessage({me: true, text: input});
      setInput("");
      document.getElementById("text-field").value = "";
    }
  };

  const addMessage = (data) => {
    const newMessage = {
      me: data.me,
      text: data.text
    }
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
  };

  useEffect(() => {
    socket.on("gameJoined", (data) => {
      setRoom(data.room);
      getMadLib(Number(data.room));
      setMeReady(true);
      if (data.first == false) setOtherReady(true);
    });

    socket.on("playerJoined", () => {
      setOtherReady(true);
    });

    socket.on("receivedType", (data) => {
      document.getElementById(data.id).value = data.content; 
    });

    socket.on("otherFinish", () => {
      setOtherFinish(true);
    });

    socket.on("receivedMessage", (data) => {
      addMessage({me: false, text: data});
    });

    socket.on("requestedToJoin", (data) => {
      if (userID == data.user) {
        window.alert("requested to join room " + data.room);
      }

    });

    if (finish && otherFinish) revealText();
    if (meReady && otherReady && madLib.length !== 0) setReady(true);
    
  });
/*
  let el = document.getElementById("text-field");
  if (el) {
    el.addEventListener("keydown", (event) => {
      event.preventDefault();
      if (event.key === 'Enter') {
          document.getElementById("send-button").click();
      }
  })}*/

  return (
    <div className="App">
      <Navbar handleSetLocation={setLocation}/>
      {location === 'main' && <Main handleSetLocation={setLocation} />}
      {location === 'login' && <UserPage handleSetLocation={setLocation} handleRequest={handleRequest} setOpponentID={setOpponent} userID = {userID} setUserID={setUserID}/>}
      {location === 'userPage' && <UserPage handleSetLocation={setLocation} handleRequest={handleRequest} setOpponentID={setOpponent} userID = {userID} setUserID={setUserID}/>}
      {location === 'choose' && <Choice handleSetLocation={setLocation} handleJoinGame={joinGame}/>}
      {location === 'game' && <Game handleTypeGame={typeGame} isReady={ready} isFinish={finish} handleFinishGame={finishGame} handleFinishMain={finishToMain} isOtherFinish={otherFinish} madLib={madLib}/>}
      {location === 'game' && chatOpen && <ChatBox handleSetInput={setInput} handleSendMessage={sendMessage} messages={messages} handleSetChatOpen={setChatOpen}/>}
      {location === 'game' && !chatOpen && <ClosedChat handleSetChatOpen={setChatOpen}/>}
    </div>
  );
}

export default App;