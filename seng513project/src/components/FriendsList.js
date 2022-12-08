import React from "react";
import Friend from "./Friend.js";
import SubmitField from "./SubmitField.js";

//userpage will contain the friends, friendslist, user info, and 3


let items = [];
const FriendsList = ( {friends, addUser} ) => {

    items = friends.map((friend) =>
        <Friend un={friend} />
    );




    
    return (
    <div class="friendList">
        <SubmitField addUser = {addUser} />
        <span>
            <br/>
            {items}
        </span>
    </div>
    )
}

export default FriendsList;