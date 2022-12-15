import { borderBottom } from "@mui/system";
import React, { useState, useEffect } from "react";
import Friend from "./Friend.js";
import FriendsList from "./FriendsList.js";
import UserInfo from "./UserInfo.js";

//the usersymbol on this page is from https://www.pngegg.com/en/png-hezlx

//var friends = [{"username": "bob", "id": "12345"}, {"username": "Tanya", "id": "1000"}];
//userpage will contain the friends, friendslist, and the userinfo. It contains all functionality and functions which are used on the user profile page
const UserPage = ({
  handleSetLocation,
  handleRequest,
  setOpponentID,
  userName,
  setUserName,
  token,
  requestedFriend,
  profileInfo,
  handleJoinGame,
  setUserID,
}) => {
  //the friends list of a user, for which we load the initial friends in the database
  const [friends, setFriends] = useState(profileInfo.friends);
  //items is a list of friends components which will be rendered
  const [items, setItems] = useState([]);
  //the number of games this player has played previously
  const [gamesPlayed, setGamesPlayed] = useState(profileInfo.gameplayed);
  //the token is passed in and contains the user's authentication information
  const [userToken, setUserToken] = useState(token);

  //these will run on the first render of this page
  //the useeffect functions was formulated using https://www.w3schools.com/react/react_useeffect.asp
  useEffect(() => {
    //used https://coursework.vschool.io/mapping-components-in-react/ to help me determine how to populate items using map.
    setFriends(profileInfo.friends);
    setGamesPlayed(profileInfo.gameplayed);
    setUserToken(token);
    setUserID(profileInfo.userID);
    setUserName(profileInfo.username);
    console.log("profileinfo",profileInfo);
    console.log("token", userToken);
  }, []);

  //this useeffect will run every time the friends array is modified
  useEffect(() => {
    //used https://coursework.vschool.io/mapping-components-in-react/ to help me determine how to populate items using map.
    if (friends != null) {
      setItems(
        friends.map((friend) => (
          <>
            <Friend
              un={friend.username}
              removeUser={removeUser}
              startGame={startGame}
              id={friend.id}
            />{" "}
            <br />
          </>
        ))
      );
    }
  }, [friends]);

  //this useeffect will run every time profileInfo is modified, and was made with the help of https://www.w3schools.com/react/react_useeffect.asp
  useEffect (() => {
    setFriends(profileInfo.friends);
    setGamesPlayed(profileInfo.gameplayed);
    setUserToken(token);
    setUserID(profileInfo.userID + " ");
    setUserName(profileInfo.username);
  }, [profileInfo])

  //this function will add a user to the friends list and send the userID to the database to populate
  async function addUser(newUserID) {
    //logic to show and update friends in the front end
    //if there are friends in the list, determine if the person is trying to add someone who they already have
    if (friends != null) {
      for (let i = 0; i < friends.length; i++) {
        if (friends[i].id === newUserID) {
          console.log(friends[i].username);
          window.alert("you cannot add a user twice");
          return;
        }
      }
    }
    //we must pass an int to the database
    var intID = parseInt(newUserID);
    console.log(intID);
    //  logic to update the database
    let databody = {
      friendID: intID,
    };
    //run a function in app.jsx which will use sockets to let the user with intID know they are being requested.
    requestedFriend(intID);
    //send the new user to the database
    const res = await fetch("http://localhost:5000/addfriend", {
      method: "POST",
      body: JSON.stringify(databody),
      headers: {
        "Content-Type": "application/json",
        "Authorization": userToken,
      },
    });
    const data_1 = await res.json();
    console.log(data_1);
    //the database should return the user's name who has this ID. If none, let the user know they don't exist.
    if (data_1.friendusername == null || data_1.friendusername == "") {
      window.alert("user does not exist!");
      return;
    }


    //change so that you are getting the ID from the database of that user
    let temp = [];
    if (friends !=null) {
      temp= [...friends];
    } else {
      temp = [];
    }
    console.log("friendusername",data_1.friendusername);
    temp.push({ username: data_1.friendusername, id: newUserID });
    setFriends([...temp]);
  }

  //this function will remove a user from the friends list and proceed to send an update to the database
  async function removeUser(remUserID, remUserName) {
    console.log("called the remove user function");
    //ensure we are sending an integer to the database
    let rem = parseInt(remUserID);
    console.log(rem);
    let databody = {
      friendID: rem,
    };
    //send a request to the DB to remove this user
    const res = await fetch("http://localhost:5000/removefriend", {
      method: "POST",
      body: JSON.stringify(databody),
      headers: {
        "Content-Type": "application/json",
        Authorization: userToken,
      },
    });
    const data_1 = await res.json();
    window.alert(remUserName + " has been deleted");

    let temp = [];
    let itemCopy = [];
    //make sure the front end UI renders without this new user
    for (let i = 0; i < friends.length; i++) {
      if (friends[i].id !== remUserID && friends[i].username !== remUserName) {
        let data = { username: friends[i].username, id: friends[i].id };
        temp.push(data);
        itemCopy.push(
          <>
            <Friend
              un={friends[i].username}
              removeUser={removeUser}
              startGame={startGame}
              id={friends[i].id}
            />
            <br />
          </>
        );
      }
    }
    setFriends([...temp]);
    console.log(friends);
  }

  //this function is called to start a new game. user2Name is who you are requesting to play with
  async function startGame(user2Name) {
    console.log("got to start game");
    handleRequest(true);
    setOpponentID(user2Name);
    console.log(user2Name);
    handleSetLocation("choose");
  }
  //this function is called if you request to join a room
  //num is the room number
  function joinaRoom(num) {
    console.log(num);
    handleJoinGame({ room: num });
  }

  //this function is called when a user requests to change their password. It will update the database and send the user
  //a confirmation alert if the database updates successfully.
  async function changePassword(pass) {
    console.log("called the change password function");
    let databody = {
      newpassword: pass,
    };
    const res = await fetch("http://localhost:5000/changedpassword", {
      method: "POST",
      body: JSON.stringify(databody),
      headers: {
        "Content-Type": "application/json",
         Authorization: userToken,
      },
    });
    const data_1 = await res.json();
    if (data_1.includes("changed")) {
      window.alert("your password has been changed.");
    } else {
      window.alert("error in changing your password. Please try again later.");
    }
    return console.log(data_1);
  }

  //this function is called when a user indicates that they want to delete their account
  async function deleteAccount() {
    console.log("called the change delete account function");
    const res = await fetch("http://localhost:5000/deleteaccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: userToken,
      },
    });
    const data_1 = await res.json();
    window.alert("you have been deleted. If you attempt to log back in, your account will no longer exist.");
    return console.log(data_1);
  }

  return (
    <div className="container">
      <div className="usercenter">
        <div className="UserPage">
          <UserInfo
            user={userName}
            id={profileInfo.userID}
            gamesPlayed={gamesPlayed}
            changePassword={changePassword}
            deleteAccount={deleteAccount}
            joinaRoom={joinaRoom}
          />
          <FriendsList
            friends={friends}
            items={items}
            addUser={addUser}
            removeUser={removeUser}
            startGame={startGame}
          />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
