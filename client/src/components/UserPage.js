import React, {useState} from "react";
import Friend from "./Friend.js";
import FriendsList from "./FriendsList.js";
import UserInfo from "./UserInfo.js";


//userpage will contain the friends, friendslist, user info, and 3
const UserPage = () => {
    //put some random user id's and then once it's there merge them.
    
    const [friends, setFriends] = useState(["test1", "test2", "test3"]);

    async function addUser (newUserID, UserID) {
        console.log("called the add user function");
            let databody = {
            "currentUser": {UserID},
            "addUser": {newUserID},
        }
        const res = await fetch('http://localhost:5000/addUser', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data_1 = await res.json();
        return console.log(data_1); 
    }
    
    async function removeUser (remUserID, UserID) {
        console.log("called the remove user function");
        let databody = {
            "currentUser": {UserID},
            "removeUser": {remUserID},
        }
        const res = await fetch('http://localhost:5000/removeUser', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data_1 = await res.json();
        return console.log(data_1); 
    }
    
    async function startGame (user1ID, user2ID) {
        console.log("called the start game function");
        let databody = {
            "currentUser": {user1ID},
            "otherUser": {user2ID},
        }
        const res = await fetch('http://localhost:5000/startGame', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data_1 = await res.json();
        return console.log(data_1); 
    }
    
    async function changeNickname(userID, newname) {
        console.log("called the change username function");
        let databody = {
            "userID": {userID},
            "newname": {newname},
        }
        const res = await fetch('http://localhost:5000/changeName', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data_1 = await res.json();
        return console.log(data_1); 
    }
    
    async function changePassword (userID, pass) {
        console.log("called the change password function");
        let databody = {
            "userID": {userID},
            "newpass": {pass},
        }
        const res = await fetch('http://localhost:5000/changeName', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data_1 = await res.json();
        return console.log(data_1); 
    }
    
    async function deleteAccount (userID) {
        console.log("called the change delete account function");
        let databody = {
            "userID": {userID},
        }
        const res = await fetch('http://localhost:5000/deleteUser', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data_1 = await res.json();
        return console.log(data_1); 
    }

    return (
        <body>
        <div class="UserPage">
         <span><center><UserInfo changeNickname={changeNickname} changePassword={changePassword} deleteAccount={deleteAccount}/></center></span>
         <span><center><FriendsList friends={friends} addUser={addUser} removeUser={removeUser} startGame={startGame} /></center></span>
        </div>
        </body>

    )
}

export default UserPage;