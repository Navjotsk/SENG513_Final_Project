import React, {useState} from "react";
import Friend from "./Friend.js";
import FriendsList from "./FriendsList.js";
import UserInfo from "./UserInfo.js";


//userpage will contain the friends, friendslist, user info, and 3
const UserPage = () => {
    const [friends, setFriends] = useState(["test1", "test2", "test3"]);
    function addUser (newUser) {
        console.log("add user requested");
    }
    
    function removeUser (user) {
        console.log("remove user requested");
    }
    
    function startGame (user) {
        console.log("startGame requested");
    }
    
    function changeNickname(oldname, newname) {
        console.log("nickname requested");
    }
    
    function changePassword (name, pass) {
        console.log("password change requested");
    }
    
    function deleteAccount () {
        console.log("delete account requested");
        window.alert("your account has been deleted. You will now be logged out...");
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