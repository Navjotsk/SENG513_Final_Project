import { borderBottom } from "@mui/system";
import React, {useState, useEffect} from "react";
import Friend from "./Friend.js";
import FriendsList from "./FriendsList.js";
import UserInfo from "./UserInfo.js";


var index = 3;
//ar friends = [];
//userpage will contain the friends, friendslist, user info, and 3
const UserPage = ( { handleSetLocation, handleRequest, setOpponentID, userName = "undefined", setUserName, requestedFriend, userID, setUserID, removedFriend, userInfo, joinGame}) => {
    //put some random user id's and then once it's there merge them.

    //friends.push({"username": "bob", "id": "12345"}, {"username": "Tanya", "id": "1000"});


    const [gamesPlayed, setGamesPlayed] = useState(userInfo.gamePlayed);
    const [friends, setFriends] = useState([]);
    const [userToken, setUserToken] = useState(userInfo.token);
    const [items, setItems] = useState(null);

    useEffect(() => {
        setFriends(userInfo.friends);
        setUserID(userInfo.UserID);
        let temp = [...friends];
        setItems(friends.map((friend) =>
        (<><Friend un={friend.username} removeUser={removeUser} startGame={startGame} id={friend.id}/> <br/></>)
        ));
    }, []);


    //get friends list from database and reinstantiate
    async function addUser (newUserID) {
        //logic to update the database
        let databody = {
            "friendName": {newUserID},
        }
        requestedFriend(newUserID);
        const res = await fetch('http://localhost:5000/addUser', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json',
                'tokenData': userToken
            },
        });
        const data_1 = await res.json();

        //logic to show and update friends in the front end
        for (let i = 0; i < friends.length; i++) {
            if (friends[i] == newUserID) {
                console.log(friends[i]);
                console.log(newUserID);
                window.alert("you cannot add a user twice");
                return;
            }
        }
        //change so that you are getting the ID from the database of that user
        let temp = [...friends];
        temp.push({"username":data_1.name, "id":newUserID});
        // temp.push({"username":"ejbce", "id":"48584"});
        // temp.push({"username":"cebcejh", "id":"55555"});
        setFriends(temp.slice(0));
        setItems(temp.map((friend) =>
            (<><Friend un={friend.username} removeUser={removeUser} startGame={startGame} id={friend.id}/> <br/></>)
        ));
        requestedFriend(newUserID);
        //return console.log(data_1); 
    }
    
    //get friends list from database and reinstantiate
    async function removeUser (remUserID, remUserName) {
        console.log("called the remove user function");
        // let databody = {
        //     "freindID": {remUserID},
        // }
        // const res = await fetch('http://localhost:5000/removeUser', {
        //     method: 'POST',
        //     body: JSON.stringify(databody),
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'tokenData': userToken
        //     },
        // });
        // const data_1 = await res.json();
        
     
        let temp = [];
        let itemCopy = [];
        for (let i = 0; i < friends.length; i++) {
            if (friends[i].id != remUserID && friends[i].username != remUserName) {
                let data = {"username": friends[i].username, "id": friends[i].id}
                temp.push(data);
                itemCopy.push(<><Friend un={friends[i].username} removeUser={removeUser} startGame={startGame} id={friends[i].id} /><br /></>)
            }
        }
        setFriends(temp.slice(0));
        console.log(friends);

        //the below line of code was formulated using help from https://www.youtube.com/watch?v=E1E08i2UJGI
        let copyItems = ([...itemCopy].filter(friend => friend.id != remUserID));
        setItems(copyItems);
        window.alert("You have removed " + remUserName);
        removedFriend(remUserID);
       // return console.log(data_1); 
    }

 
    //send to the other user
    async function startGame (user2Name) {
        console.log("got to start game");
        handleRequest(true);
        setOpponentID(user2Name);
        console.log(user2Name);
        handleSetLocation('choose');
    }

    function joinaRoom (num) {
        console.log(num);
        joinGame(null, num);
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
                'tokenData': userToken
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
                'tokenData': userToken
            },
        });
        const data_1 = await res.json();
        return console.log(data_1); 
    }

    return (
        <body>
        <div class="UserPage">
         <span><center><UserInfo user={userName} userID = {userID} gamesPlayed={gamesPlayed} changePassword={changePassword} deleteAccount={deleteAccount} joinaRoom = {joinaRoom}/></center></span>
         <span><center><FriendsList friends={friends} items={items} addUser={addUser} removeUser={removeUser} startGame={startGame} /></center></span>
        </div>
        </body>

    )
}

export default UserPage;