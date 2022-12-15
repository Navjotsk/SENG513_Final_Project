import React from "react";
import { useEffect, useState } from "react";
import userLogo from '../images/userSymbol.png';
import Button from './Button.js';
import ElicitInfo from "./ElicitInfo";


//userinfo contains information about a user and buttons to allow them to modify their account. For instance, it will allow a user
//to change their password.
export default function UserInfo({user = "undefined", id, gamesPlayed = 0, date=0, changePassword, deleteAccount, joinaRoom}) {
    //this is the field rendered for the password reset option
    const [resetPassField, setResetPassField] = useState(<><button onClick={newPassPrompt}>Change Password</button><br /></>);
    //this is the field rendered for the number of games played
    const [gameString, setGameString] = useState(gamesPlayed + ' ');
    //this is the field rendered if you choose to join a room
    const [joinRoomField, setJoinRoomField] = useState(<><button onClick={joinRoomPrompt}>Join Room</button><br /></>)

    //this function is called when a new password is entered, and sets the field back to a password button.
    function newPassword (pass) {
        console.log(pass);
        changePassword(pass);
        setResetPassField(<><button onClick={newPassPrompt}>Change Password</button><br /></>);
    }

    //this function is called when a user wants to delete their account and calls the function in the parent
    function deleteAcc () {
        deleteAccount();
    }
    //this function is called when a user indicates a room to join, and sets the field back to a button.
    function join (num) {
        setJoinRoomField(<><button onClick={joinRoomPrompt}>Join Room</button><br /></>);
        joinaRoom(num);
    }

    //this function changes the password field into a textbox
    function newPassPrompt () {
        setResetPassField(<ElicitInfo funct={newPassword} action="" hidden="true" />)
    }
    //this function changes the room field into a textbox
    function joinRoomPrompt () {
        setJoinRoomField(<ElicitInfo funct={join} action="" hidden="false" />)
    }

  return (
    <div className="mainUserInfo">
        <img src={userLogo} alt="..." />&nbsp;Name: {user}&nbsp;, User Id: {id}
        <br/>
        <br/>
        {/* <p>Games Played: {gamesPlayed}</p> */}
        <br/>
        <br/>
        {resetPassField}
        <button onClick={deleteAcc}>Delete Account</button>
        <br/>
        {joinRoomField}
    </div>
  );
}