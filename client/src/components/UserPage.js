import { borderBottom } from "@mui/system";
import React, {useState, useEffect} from "react";
import Friend from "./Friend.js";
import FriendsList from "./FriendsList.js";
import UserInfo from "./UserInfo.js";


//var friends = [{"username": "bob", "id": "12345"}, {"username": "Tanya", "id": "1000"}];
//userpage will contain the friends, friendslist, user info, and 3
const UserPage = ( { handleSetLocation, handleRequest, setOpponentID, userName = "undefined", setUserName, token, requestedFriend, removedFriend, profileInfo, handleJoinGame, setUserID}) => {
    //put some random user id's and then once it's there merge them.

    var profileInfo = { friends: [{"username": "bob", "id": "12345"}, {"username": "Tanya", "id": "1000"}], username: "bobby", gameplayed: 0, userID: 1234 }

    //var friendslist = [{"username": "jim", "id": "12345"}, {"username": "cam", "id": "1000"}, {"username": "jon", "id": "39939"}];
    //var friends = [{"username": "bob", "id": "12345"}, {"username": "Tanya", "id": "1000"}];

    const [friends, setFriends] = useState(profileInfo.friends);
    const [items, setItems] = useState([]);
    const [gamesPlayed, setGamesPlayed] = useState(profileInfo.gamesPlayed);
    const [userToken, setUserToken] = useState(token);

    useEffect(() => { 
        //setFriends([...friendslist]);
        setItems(friends.map((friend) =>(<><Friend un={friend.username} removeUser={removeUser} startGame={startGame} id={friend.id}/> <br/></>)));
        setUserID(profileInfo.userID + " ");
        setUserName(profileInfo.username);

    }, []);

    //get friends list from database and reinstantiate
    async function addUser (newUserID) {
      //  logic to update the database
        let databody = {
            "friend": {newUserID},
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
        if (data_1.userName == null) {
            window.alert("user does not exist!");
            return;
        }

        //logic to show and update friends in the front end
        for (let i = 0; i < friends.length; i++) {
            if (friends[i].username === data_1.userName) {
                console.log(friends[i].username);
                console.log(data_1.userName);
                window.alert("you cannot add a user twice");
                return;
            }
        }
        //change so that you are getting the ID from the database of that user
        let temp = [...friends];
        temp.push({"username":data_1.userName, "id":newUserID});
        setFriends([...temp]);
        setItems(temp.map((friend) =>
            (<><Friend un={friend.username} removeUser={removeUser} startGame={startGame} id={friend.id}/> <br/></>)
        ));
        requestedFriend(data_1.userName);
        //return console.log(data_1); 
    }
    
    //get friends list from database and reinstantiate
    async function removeUser (remUserID, remUserName) {
        console.log("called the remove user function");
        let databody = {
            "freindID": {remUserID},
        }
        const res = await fetch('http://localhost:5000/removeUser', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json',
                'tokenData': userToken
            },
        });
        const data_1 = await res.json();
        
     
        let temp = [];
        let itemCopy = [];
        for (let i = 0; i < friends.length; i++) {
            if (friends[i].id !== remUserID && friends[i].username !== remUserName) {
                let data = {"username": friends[i].username, "id": friends[i].id}
                temp.push(data);
                itemCopy.push(<><Friend un={friends[i].username} removeUser={removeUser} startGame={startGame} id={friends[i].id} /><br /></>)
            }
        }
        //friends = [];
        setFriends([...temp]);
        console.log(friends);

        //the below line of code was formulated using help from https://www.youtube.com/watch?v=E1E08i2UJGI
        let copyItems = ([...itemCopy].filter(friend => friend.id !== remUserID));
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
        handleJoinGame({room: num});
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
        <div className="container">
            <div className="usercenter">
                <div className="UserPage">
                    <UserInfo user={userName} gamesPlayed={gamesPlayed} changePassword={changePassword} deleteAccount={deleteAccount} joinaRoom = {joinaRoom}/>
                    <FriendsList friends={friends} items={items} addUser={addUser} removeUser={removeUser} startGame={startGame} />
                </div>
            </div>
        </div>

    )
}

export default UserPage;