import React from "react";
import Friend from "./Friend.js";
import FriendsList from "./FriendsList.js";


//userpage will contain the friends, friendslist, user info, and 3
const UserPage = ( {friends}) => {
    return <FriendsList friends={friends}/>
}

export default UserPage;