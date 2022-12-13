import React, {useState, useEffect} from "react";
import Friend from "./Friend.js";
import FriendsList from "./FriendsList.js";
import UserInfo from "./UserInfo.js";

var friends = ["temp1", "temp2", "temp3"];
var index = 3;

//userpage will contain the friends, friendslist, user info, and 3
const UserPage = ( { handleSetLocation, handleRequest, setOpponentID, userID = "undefined", setUserID, token = "", requestedFriend}) => {
    //put some random user id's and then once it's there merge them.


    const [items, setItems] = useState(friends.map((friend) =>
        (<><Friend un={friend} removeUser={removeUser} startGame={startGame}/> <br/></>)
    ));
    const [user, setUser] = useState("undefined");
    const [gamesPlayed, setGamesPlayed] = useState(0);
    const [currentId, setCurrentId] = useState(null);
    const [userToken, setUserToken] = useState(token);


    function onLoad () {
        //set the friends from the database names
        //friends = ["test1", "test2", "test3"];
    }

    //get friends list from database and reinstantiate
    async function addUser (newUserName) {
        console.log(friends);
        for (let i = 0; i < friends.length; i++) {
            if (friends[i] == newUserName) {
                console.log(friends[i]);
                console.log(newUserName);
                window.alert("you cannot add a user twice");
                return;
            }
        }
        friends.push(newUserName);
        setItems(friends.map((friend) =>
            (<><Friend un={friend} removeUser={removeUser} startGame={startGame}/> <br/></>)
        ));
        console.log("called the add user function");
            let databody = {
            //"currentUser": {UserID},
            "addUser": {newUserName},
        }
        requestedFriend(newUserName);
        const res = await fetch('http://localhost:5000/addUser', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json',
                'token': userToken
            },
        });
        const data_1 = await res.json();
        return console.log(data_1); 
    }
    
    //get friends list from database and reinstantiate
    async function removeUser (remUserID) {
        let temp = [];
        for (let i = 0; i < friends.length; i++) {
            if (friends[i] != remUserID) {
                temp.push(friends[i]);
            }
        }
        friends = [];
        friends = temp;
        console.log(friends);

        let tempItems = [];
        for(let i = 0; i < friends.length; i++) {
            console.log(friends[i]);
            console.log();
            tempItems.push(<><Friend un={friends[i]} removeUser={removeUser} startGame={startGame} /> <br/></>);
        }
        console.log(tempItems.length);
        setItems(...tempItems.slice(0));

        // setItems(friends.map((friend) =>
        //     (<><Friend un={friend} removeUser={removeUser} startGame={startGame} /> <br/></>)
        // ));


        console.log("called the remove user function");
        let databody = {
            "removeUser": {remUserID},
        }
        const res = await fetch('http://localhost:5000/removeUser', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json',
                'token': userToken
            },
        });
        const data_1 = await res.json();
        return console.log(data_1); 
     }
    
    //send to the other user
    async function startGame (user2Name) {
        console.log("got to start game");
        handleRequest(true);
        setOpponentID(user2Name);
        console.log(user2Name);
        handleSetLocation('choose');
    }
    
    async function changeNickname(newname) {
        console.log("called the change username function");
        setUserID(newname);
        let databody = {
            "newname": {newname},
        }
        const res = await fetch('http://localhost:5000/changeName', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json',
                'token': userToken
            },
        });
        const data_1 = await res.json();
        return console.log(data_1); 
    }
    
    async function changePassword (pass) {
        console.log("called the change password function");
        let databody = {
          //  "userID": {UserID},
            "newpass": {pass},
        }
        const res = await fetch('http://localhost:5000/changePassword', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json',
                'token': userToken
            },
        });
        window.alert("your password has been changed.");
        const data_1 = await res.json();
        return console.log(data_1); 
    }
    
    async function deleteAccount () {
        console.log("called the change delete account function");
       // let databody = {
           // "userID": {UserID},
       // }
        const res = await fetch('http://localhost:5000/deleteUser', {
            method: 'POST',
          //  body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json',
                'token': userToken
            },
        });
        const data_1 = await res.json();
        return console.log(data_1); 
    }

    return (
        <body>
        <div class="UserPage">
         <span><center><UserInfo user={userID} gamesPlayed={gamesPlayed} changeNickname={changeNickname} changePassword={changePassword} deleteAccount={deleteAccount}/></center></span>
         <span><center><FriendsList friends={friends} items={items} addUser={addUser} removeUser={removeUser} startGame={startGame} /></center></span>
        </div>
        </body>

    )
}

export default UserPage;