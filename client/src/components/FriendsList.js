import React from "react";
import Friend from "./Friend.js";
import SubmitField from "./SubmitField.js";

//userpage will contain the friends, friendslist, user info, and 3


// var items = [];
const FriendsList = ( { friends, items, addUser, removeUser, startGame} ) => {

    // items = friends.map((friend) =>
    //     (<><Friend un={friend} removeUser={removeUser} startGame={startGame}/> <br/></>)
    // );




    
    return (
    <div class="friendList">
        <h2>FRIENDS</h2>
        <SubmitField addUser = {addUser} action="Add User"  />
        <span>
            <br/>
            {items}
        </span>
    </div>
    )
}

export default FriendsList;