import React from "react";
import Friend from "./Friend.js";
import FriendsList from "./FriendsList.js";

function addUser (newUser) {
    console.log("add user requested");
}
//userpage will contain the friends, friendslist, user info, and 3
const UserPage = ( {friends} ) => {
    return <FriendsList friends={friends} addUser={addUser}/>
}

export default UserPage;