import { borderBottom } from "@mui/system";
import React, { useState, useEffect } from "react";
import Friend from "./Friend.js";
import FriendsList from "./FriendsList.js";
import UserInfo from "./UserInfo.js";

//the usersymbol on this page is from https://www.pngegg.com/en/png-ofcqn

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
  removedFriend,
  profileInfo,
  handleJoinGame,
  setUserID,
}) => {
  //COMMENT OUT WHEN READY TO TEST
  //var profileInfo = { friends: [{"username": "bob", "id": 12345}, {"username": "Tanya", "id": 1000}], username: "bobby", gameplayed: 0, userID: 1234 }

  //the friends list of a user, for which we load the initial friends in the database
  const [friends, setFriends] = useState(profileInfo.friends);
  //items is a list of friends components which will be rendered
  const [items, setItems] = useState([]);
  //the number of games this player has played previously
  const [gamesPlayed, setGamesPlayed] = useState(profileInfo.gameplayed);
  //the token is passed in and contains the user's authentication information
  const [userToken, setUserToken] = useState(token);

  //these will run on the first render of this page
  //the useeffect function was formulated using https://www.w3schools.com/react/react_useeffect.asp
  useEffect(() => {
    //used https://coursework.vschool.io/mapping-components-in-react/ to help me determine how to populate items using map.
    // setItems(
    //   friends.map((friend) => (
    //     <>
    //       <Friend
    //         un={friend.username}
    //         removeUser={removeUser}
    //         startGame={startGame}
    //         id={friend.id}
    //       />{" "}
    //       <br />
    //     </>
    //   ))
    // );
    setUserID(profileInfo.userID + " ");
    setUserName(profileInfo.username);
  }, []);

  //this function will add a user to the friends list and send the userID to the database to populate
  async function addUser(newUserID) {
    //  logic to update the database
    let databody = {
      friend: { newUserID },
    };
    requestedFriend(newUserID);
    const res = await fetch("http://localhost:5000/addfriend", {
      method: "POST",
      body: JSON.stringify(databody),
      headers: {
        "Content-Type": "application/json",
        tokenData: userToken,
      },
    });
    const data_1 = await res.json();
    //the database should return the user's name who has this ID
    if (data_1.friendusername == null || data_1.friendusername == "") {
      window.alert("user does not exist!");
      return;
    }

    //logic to show and update friends in the front end
    for (let i = 0; i < friends.length; i++) {
      if (friends[i].username === data_1.friendusername) {
        console.log(friends[i].username);
        console.log(data_1.friendusername);
        window.alert("you cannot add a user twice");
        return;
      }
    }
    //change so that you are getting the ID from the database of that user
    let temp = [...friends];
    temp.push({ username: data_1.friendusername, id: newUserID });
    setFriends([...temp]);
    setItems(
      temp.map((friend) => (
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
    requestedFriend(newUserID);
    //return console.log(data_1);
  }

  //this function will remove a user from the friends list and proceed to send an update to the database
  async function removeUser(remUserID, remUserName) {
    console.log("called the remove user function");
    let databody = {
      freindID: { remUserID },
    };
    const res = await fetch("http://localhost:5000/removefriend", {
      method: "POST",
      body: JSON.stringify(databody),
      headers: {
        "Content-Type": "application/json",
        tokenData: userToken,
      },
    });
    const data_1 = await res.json();
    if (data_1.friendusername == remUserName) {
      window.alert("You have removed " + remUserName);
    } else {
      window.alert("issue with removing user.");
    }

    let temp = [];
    let itemCopy = [];
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
    //friends = [];
    setFriends([...temp]);
    console.log(friends);

    //the below line of code was formulated using help from https://www.youtube.com/watch?v=E1E08i2UJGI
    let copyItems = [...itemCopy].filter((friend) => friend.id !== remUserID);
    setItems(copyItems);
    removedFriend(remUserID);
    // return console.log(data_1);
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
  function joinaRoom(num) {
    console.log(num);
    handleJoinGame({ room: num });
  }

  // async function changeNickname(newname) {
  //     console.log("called the change username function");
  //     setUserName(newname);
  //     let databody = {
  //         "newname": {newname},
  //     }
  //     const res = await fetch('http://localhost:5000/changeName', {
  //         method: 'POST',
  //         body: JSON.stringify(databody),
  //         headers: {
  //             'Content-Type': 'application/json',
  //             'tokenData': userToken
  //         },
  //     });
  //     const data_1 = await res.json();
  //     return console.log(data_1);
  // }

  //this function is called when a user requests to change their password. It will update the database and send the user
  //a confirmation alert if the database updates successfully.
  async function changePassword(pass) {
    console.log("called the change password function");
    let databody = {
      //  "userID": {UserID},
      newpassword: { pass },
    };
    const res = await fetch("http://localhost:5000/changedpassword", {
      method: "POST",
      body: JSON.stringify(databody),
      headers: {
        "Content-Type": "application/json",
        tokenData: userToken,
      },
    });
    const data_1 = await res.json();
    if (data_1.contains("changed")) {
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
        tokenData: userToken,
      },
    });
    const data_1 = await res.json();
    if (data_1 == "user has been removed from DB") {
      window.alert("your account has been deleted.");
    } else {
      window.alert("error in deleting your account...");
    }
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
