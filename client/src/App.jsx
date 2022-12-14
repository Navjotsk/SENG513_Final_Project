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
  const [loginInfo, setLoginInfo] = useState("");
  const [profileInfo, setProfileInfo] = useState("");

  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [opponent, setOpponent] = useState("");
  const [request, handleRequest] = useState(false);

  const joinGame = (data) => {
    if (data.room !== undefined) {
      console.log('in undefined');
      socket.emit("joinGame", {topic: 'joinRequest', room: data.room})
      setLocation('game');
    }
    else if (opponent === "") {
      socket.emit("joinGame", {topic: data, opponent: null, requestor: null});
    }
    else {
      socket.emit("joinGame", {topic: 'request', opponent: opponent, requestor: userName} )
    }
    //reset state variables for if user wants an opponent requested
    handleRequest(false);
    setOpponent("");
  };

  const requestedFriend = (newUserID) => {
    socket.emit("friendRequest", {user: newUserID, requestor: userName});
  }

  const removedFriend = (removeID) => {
    socket.emit("friendRemoved", {userID: removeID, requestor: userName});
  }

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
    setMeReady(false)
    setOtherReady(false)
    setFinish(false)
    setOtherFinish(false)
    setMadlib([])
    setMessages([])
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

  const getId = (data) => {
    let id = -1;
    if (data > 7000) id = data%1000;
    else if (data > 6000) {
      if (data%2 === 1) id = 11;
      else id = 12;
    }
    else if (data > 5000) {
      if (data%2 === 1) id = 9;
      else id = 10;
    }
    else if (data > 4000) {
      if (data%2 === 1) id = 7;
      else id = 8;
    }
    else if (data > 3000) {
      if (data%2 === 1) id = 5;
      else id = 6;
    }
    else if (data > 2000) {
      if (data%2 === 1) id = 3;
      else id = 4;
    }
    else if (data > 1000) {
      if (data%2 === 1) id = 1;
      else id = 2;
    }
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

    socket.on("requestedToJoin", (data) => {
      if (userName == data.user) {
        window.alert(data.requestor + " requested you to join room " + data.room);
      }

    });

    socket.on("requestedFriend", (data) => {
      if (userID == data.user) {
        window.alert(data.requestor + " is following you!");
      }
    });

    socket.on("unfollowed", (data) => {
      if (userID == data.user) {
        window.alert(data.requestor + " has unfollowed you!");
      }
    })

    if (finish && otherFinish) revealText();
    if (meReady && otherReady && madLib.length !== 0) setReady(true);
    
  });

  return (
    <div className="App">
      <Navbar handleSetLocation={setLocation}/>
      {location === 'main' && <Main handleSetLocation={setLocation} />}
      {location === 'login' && <Login handleSetLocation={setLocation} handleLoginInfo={setLoginInfo} handleProfileInfo={setProfileInfo}/>}
      {location === 'userPage' && <UserPage handleSetLocation={setLocation} handleRequest={handleRequest} setOpponentID={setOpponent} userName = {userName} setUserName={setUserName} token={loginInfo.token} requestedFriend={requestedFriend} removedFriend={removedFriend} profileInfo={profileInfo} handleJoinGame={joinGame} setUserID = {setUserID}/>}
      {location === 'choose' && <Choice handleSetLocation={setLocation} handleJoinGame={joinGame}/>}
      {location === 'game' && <Game handleTypeGame={typeGame} isReady={ready} isFinish={finish} handleFinishGame={finishGame} handleFinishMain={finishToMain} isOtherFinish={otherFinish} madLib={madLib}/>}
      {location === 'game' && chatOpen && <ChatBox handleSetInput={setInput} handleSendMessage={sendMessage} messages={messages} handleSetChatOpen={setChatOpen}/>}
      {location === 'game' && !chatOpen && <ClosedChat handleSetChatOpen={setChatOpen}/>}
    </div>
  );
}

export default App;
