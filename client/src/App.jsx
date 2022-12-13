import './App.css';
import { useState, useEffect } from "react";
import Navbar from './components/NavBar';
import Main from './components/Main';
import Choice from './components/Choice';
import Game from './components/Game';
import Login from './components/Login';
import ChatBox from './components/ChatBox';
import UserPage from './components/UserPage'

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
    socket.emit("sendMessage", { text: input, room: room });
    addMessage({me: true, text: input});
    setInput("");
    document.getElementById("text-field").value = "";
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

    if (finish && otherFinish) revealText();
    if (meReady && otherReady && madLib.length !== 0) setReady(true);
    
  });

  return (
    <div className="App">
      <Navbar handleSetLocation={setLocation}/>
      {location === 'main' && <Main handleSetLocation={setLocation} />}
      {location === 'login' && <Login handleSetLocation={setLocation}/>}
      {location === 'userPage' && <UserPage handleSetLocation={setLocation}/>}
      {location === 'choose' && <Choice handleSetLocation={setLocation} handleJoinGame={joinGame}/>}
      {location === 'game' && <Game handleTypeGame={typeGame} isReady={ready} isFinish={finish} handleFinishGame={finishGame} handleFinishMain={finishToMain} isOtherFinish={otherFinish} madLib={madLib}/>}
      {location === 'game' && <ChatBox handleSetInput={setInput} handleSendMessage={sendMessage} messages={messages}/>}
    </div>
  );
}

export default App;