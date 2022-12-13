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

  const joinGame = (data) => {
    socket.emit("joinGame", {topic: data});
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

  // reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  const getId = (data) => {
    let id = -1;
    if (data > 7000) id = getRandomInt(1, 13);
    else if (data > 6000) id = getRandomInt(11, 13);
    else if (data > 5000) id = getRandomInt(9, 11);
    else if (data > 4000) id = getRandomInt(7, 9);
    else if (data > 3000) id = getRandomInt(5, 7);
    else if (data > 2000) id = getRandomInt(3, 5);
    else if (data > 1000) id = getRandomInt(1, 3);
    return id;
  }

  useEffect(() => {
    socket.on("gameJoined", (data) => {
      setRoom(data.room);
      getMadLib(getId(Number(data.room)));
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
      {location === 'login' && <Login handleSetLocation={setLocation}/>}
      {location === 'userPage' && <UserPage handleSetLocation={setLocation}/>}
      {location === 'choose' && <Choice handleSetLocation={setLocation} handleJoinGame={joinGame}/>}
      {location === 'game' && <Game handleTypeGame={typeGame} isReady={ready} isFinish={finish} handleFinishGame={finishGame} handleFinishMain={finishToMain} isOtherFinish={otherFinish} madLib={madLib}/>}
      {location === 'game' && chatOpen && <ChatBox handleSetInput={setInput} handleSendMessage={sendMessage} messages={messages} handleSetChatOpen={setChatOpen}/>}
      {location === 'game' && !chatOpen && <ClosedChat handleSetChatOpen={setChatOpen}/>}
    </div>
  );
}

export default App;