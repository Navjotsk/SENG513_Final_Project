import React from "react";
import Friend from "./Friend.js";
import FriendsList from "./FriendsList.js";
import UserInfo from "./UserInfo.js";

function addUser (newUser) {
    console.log("add user requested");
}
//userpage will contain the friends, friendslist, user info, and 3
const UserPage = ( {friends} ) => {
    return (
        <div class="UserPage">
         <span><center><UserInfo /></center></span>
         <span><center><FriendsList friends={friends} addUser={addUser}/></center></span>
        </div>

    )
}

export default UserPage;