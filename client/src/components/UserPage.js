import React, {useState, useEffect} from "react";
import Friend from "./Friend.js";
import FriendsList from "./FriendsList.js";
import UserInfo from "./UserInfo.js";


//userpage will contain the friends, friendslist, user info, and 3
const UserPage = ( {socket, handleSetLocation, userID}) => {
    //put some random user id's and then once it's there merge them.
    
    //const [friends, setFriends] = useState(["temp1", "temp2", "temp3"]);
    var friends = ["temp1", "temp2", "temp3"];
    //names of friends. Add the name in register as well.

    // var items = [];
    // items = friends.map((friend) =>
    // (<><Friend un={friend} removeUser={removeUser} startGame={startGame}/> <br/></>)
    // );

    const [items, setItems] = useState(friends.map((friend) =>
        (<><Friend un={friend} removeUser={removeUser} startGame={startGame}/> <br/></>)
    ));

    var currentID = null;

    function onLoad () {
        //set the friends from the database names
        friends = ["test1", "test2", "test3"];
    }

    //get friends list from database and reinstantiate
    async function addUser (newUserID) {
        console.log("called the add user function");
            let databody = {
            //"currentUser": {UserID},
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
    
    //get friends list from database and reinstantiate
    async function removeUser (remUserID) {
    //     for (let i = 0; i < friends.length; i++) {
    //         if (friends[i] != remUserID) {
    //             friends.push(friends[i]);
    //         }
    //     }
    //     console.log(friends);
    //     setItems(friends.map((friend) =>
    //         (<><Friend un={friend} removeUser={removeUser} startGame={startGame} /> <br/></>)
    //     ));
    //     console.log(items);


    //     console.log("called the remove user function");
    //     let databody = {
    //         "removeUser": {remUserID},
    //     }
    //     const res = await fetch('http://localhost:5000/removeUser', {
    //         method: 'POST',
    //         body: JSON.stringify(databody),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //     });
    //     const data_1 = await res.json();
    //     return console.log(data_1); 
     }
    
    //send to the other user
    async function startGame (user2ID) {
        console.log("got to start game");
         let data = {
             user1ID : "u1",
             user2ID : {user2ID}
        }
        socket.emit("startGameRequest", data);
        handleSetLocation('choose');
    }
    
    async function changeNickname(newname) {
        console.log("called the change username function");
        let databody = {
           // "userID": {UserID},
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
    
    async function changePassword (pass) {
        console.log("called the change password function");
        let databody = {
          //  "userID": {UserID},
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
    
    async function deleteAccount () {
        console.log("called the change delete account function");
       // let databody = {
           // "userID": {UserID},
       // }
        const res = await fetch('http://localhost:5000/deleteUser', {
            method: 'POST',
          //  body: JSON.stringify(databody),
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
         <span><center><FriendsList friends={friends} items={items} addUser={addUser} removeUser={removeUser} startGame={startGame} /></center></span>
        </div>
        </body>

    )
}

export default UserPage;