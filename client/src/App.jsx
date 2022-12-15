// imports
import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./components/NavBar";
import Main from "./components/Main";
import Choice from "./components/Choice";
import Game from "./components/Game";
import Login from "./components/Login";
import ChatBox from "./components/ChatBox";
import UserPage from "./components/UserPage";
import ClosedChat from "./components/ClosedChat";

import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");

function App() {
  const [location, setLocation] = useState("main");
  const [room, setRoom] = useState(-1);
  const [ready, setReady] = useState(false);
  const [meReady, setMeReady] = useState(false);
  const [otherReady, setOtherReady] = useState(false);
  const [finish, setFinish] = useState(false);
  const [otherFinish, setOtherFinish] = useState(false);
  const [madLib, setMadlib] = useState([]);
  const [loginInfo, setLoginInfo] = useState("");
  const [profileInfo, setProfileInfo] = useState("");

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);

  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [opponent, setOpponent] = useState("");
  const [request, handleRequest] = useState(false);
  const [loggedIn, setloggedIn] = useState(false);

  // user want to join a game
  const joinGame = (data) => {
    // if joining a designated room from profile
    if (data.room !== undefined) {
      socket.emit("joinGame", { topic: "joinRequest", room: data.room });
      setLocation("game");
    } 
    // if joining from random matching
    else if (opponent === "") {
      socket.emit("joinGame", { topic: data, opponent: null, requestor: null });
    } 
    // if requesting game from follow
    else {
      socket.emit("joinGame", {
        topic: "request",
        opponent: opponent,
        requestor: userName,
      });
    }
    //reset state variables for if user wants an opponent requested
    handleRequest(false);
    setOpponent("");
  };

  // user request to follw a friend
  const requestedFriend = (newUserID) => {
    socket.emit("friendRequest", { user: newUserID, requestor: userName });
  };

  // the input in the madlib textboxes has been changed, emit to server
  const typeGame = (data) => {
    socket.emit("typeGame", { id: data.id, content: data.content, room: room });
  };

  // player has pressed finish button
  const finishGame = (data) => {
    setFinish(true);
    socket.emit("finishGame", { room: room });
  };

  // the game is finished, so unblur the text
  const revealText = () => {
    // get all the span and input in text-container
    let dom_span = document.querySelectorAll(".text-container span");
    let dom_input = document.querySelectorAll(".text-container input");
    // set colour of span text to black and remove text shadow
    for (let i = 0; i < dom_span.length; i++) {
      dom_span[i].style.color = "#000000";
      dom_span[i].style.textShadow = "none";
    }
    // convert the tetfield inputs to span and make it bold
    let story = madLib.story_sentence;
    for (let i = 0; i < dom_input.length; i++) {
      dom_span[i].innerHTML = `${story[i]}<b>${dom_input[i].value}</b>`;
    }
  };

  // return the user to the main page
  const finishToMain = () => {
    setLocation("main");
    setRoom(-1);
    setReady(false);
    setMeReady(false);
    setOtherReady(false);
    setFinish(false);
    setOtherFinish(false);
    setMadlib([]);
    setMessages([]);
  };

  // get the madlib and store it
  const getMadLib = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/madlibs/${id}`);
      const jsonData = await response.json();
      setMadlib(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  // send a message in the chat
  const sendMessage = () => {
    if (input !== "") {
      // emit sendMessage to the server with the message inputed and the room number
      socket.emit("sendMessage", { text: input, room: room });
      // add the message to state
      addMessage({ me: true, text: input });
      // empty the input state
      setInput("");
      // empty the input textfield
      document.getElementById("text-field").value = "";
    }
  };

  // message is saved to be displayed on the chatbox
  const addMessage = (data) => {
    // create new message
    const newMessage = {
      me: data.me,
      text: data.text,
    };
    // add to messages
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
  };

  // calculate the id of the madlib to be fetched from the database
  const getId = (data) => {
    let id = -1;
    if (data > 7000) id = data % 1000;
    else if (data > 6000) {
      if (data % 2 === 1) id = 11;
      else id = 12;
    } else if (data > 5000) {
      if (data % 2 === 1) id = 9;
      else id = 10;
    } else if (data > 4000) {
      if (data % 2 === 1) id = 7;
      else id = 8;
    } else if (data > 3000) {
      if (data % 2 === 1) id = 5;
      else id = 6;
    } else if (data > 2000) {
      if (data % 2 === 1) id = 3;
      else id = 4;
    } else if (data > 1000) {
      if (data % 2 === 1) id = 1;
      else id = 2;
    }
    return id;
  };

  useEffect(() => {
    // catch gameJoined from the server
    socket.on("gameJoined", (data) => {
      // save the room number
      setRoom(data.room);
      // get the madlib
      getMadLib(getId(Number(data.room)));
      // set player as ready
      setMeReady(true);
      // if the player is the second to join the game, det the player as ready as well
      if (data.first == false) setOtherReady(true);
    });

    // second player has joined the game
    socket.on("playerJoined", () => {
      // set second player as ready
      setOtherReady(true);
    });

    // received that the other player has typed something into madlib textboxes
    socket.on("receivedType", (data) => {
      // reflect change on webpage
      document.getElementById(data.id).value = data.content; 
    });

    // other player has clicked finish
    socket.on("otherFinish", () => {
      setOtherFinish(true);
    });

    // received message in chatbos from other player
    socket.on("receivedMessage", (data) => {
      addMessage({me: false, text: data});
    });

    // player have been requested to a game
    socket.on("requestedToJoin", (data) => {
      if (userName == data.user) {
        window.alert(data.requestor + " requested you to join room " + data.room);
      }

    });

    // player has been followed by other player
    socket.on("requestedFriend", (data) => {
      if (userID == data.user) {
        window.alert(data.requestor + " is following you!");
      }
    });

    // check if madlib text should unblurred
    if (finish && otherFinish) revealText();
    // check if the game is ready to be started
    if (meReady && otherReady && madLib.length !== 0) setReady(true);
  });

  // html for the actual website
  return (
    <div className="App">
      <Navbar handleSetLocation={setLocation} handleSetLoggedIn={setloggedIn} isLoggedIn={loggedIn}/>
      {location === "main" && <Main handleSetLocation={setLocation} isLoggedIn={loggedIn}/>}
      {location === "login" && (
        <Login
          handleSetLocation={setLocation}
          handleLoginInfo={setLoginInfo}
          handleProfileInfo={setProfileInfo}
          handleSetLoggedIn={setloggedIn}
        />
      )}
      {location === "userPage" && (
        <UserPage
          handleSetLocation={setLocation}
          handleRequest={handleRequest}
          setOpponentID={setOpponent}
          userName={userName}
          setUserName={setUserName}
          token={loginInfo.token}
          requestedFriend={requestedFriend}
          profileInfo={profileInfo}
          handleJoinGame={joinGame}
          setUserID={setUserID}
        />
      )}
      {location === "choose" && (
        <Choice handleSetLocation={setLocation} handleJoinGame={joinGame} />
      )}
      {location === "game" && (
        <Game
          handleTypeGame={typeGame}
          isReady={ready}
          isFinish={finish}
          handleFinishGame={finishGame}
          handleFinishMain={finishToMain}
          isOtherFinish={otherFinish}
          madLib={madLib}
        />
      )}
      {location === "game" && chatOpen && (
        <ChatBox
          handleSetInput={setInput}
          handleSendMessage={sendMessage}
          messages={messages}
          handleSetChatOpen={setChatOpen}
        />
      )}
      {location === "game" && !chatOpen && (
        <ClosedChat handleSetChatOpen={setChatOpen} />
      )}
    </div>
  );
}

export default App;
