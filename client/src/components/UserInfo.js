import React from "react";
import { useEffect, useState } from "react";
import userLogo from '../images/userSymbol.png';
import Button from './Button.js';
import ElicitInfo from "./ElicitInfo";


export default function UserInfo({user = "undefined", gamesPlayed = 0, date=0, changeNickname, changePassword, deleteAccount, joinaRoom}) {
    const [newNameField, setNewNameField] = useState(<><button onClick={newNameSearch}>Change Nickname</button><br /></>);
    const [resetPassField, setResetPassField] = useState(<><button onClick={newPassPrompt}>Change Password</button><br /></>);
    const [gameString, setGameString] = useState(gamesPlayed + ' ');
    const [joinRoomField, setJoinRoomField] = useState(<><button onClick={joinRoomPrompt}>Join Room</button><br /></>)

    function newNickname (name) {
        changeNickname(name);
        setNewNameField(<><button onClick={newNameSearch}>Change Nickname</button><br /></>)
    }

    function newPassword (pass) {
        console.log(pass);
        changePassword(pass);
        setResetPassField(<><button onClick={newPassPrompt}>Change Password</button><br /></>);

    }

    function resetPassword () {
        let pass = window.prompt("enter your new password");
        changePassword(user, pass);
    }

    function deleteAcc () {
        window.alert("Account deletion request recieved.");
        deleteAccount();
    }

    function join (num) {
        setJoinRoomField(<><button onClick={joinRoomPrompt}>Join Room</button><br /></>);
        joinaRoom(num);
    }

    function newNameSearch () {
        setNewNameField(<ElicitInfo funct={newNickname} action="" hidden="false" />);
    }

    function newPassPrompt () {
        setResetPassField(<ElicitInfo funct={newPassword} action="" hidden="true" />)
    }

    function joinRoomPrompt () {
        setJoinRoomField(<ElicitInfo funct={join} action="" hidden="false" />)
    }




  return (
    <div class="mainUserInfo">
        <img src={userLogo} alt="..." />&nbsp;{user}&nbsp;
        <br/>
        <br/>
        <>Joined: {date}</>
        <br/>
        <br/>
        <>Games Played: {gamesPlayed}</>
        <br/>
        <br/>
        {newNameField}
        {resetPassField}
        <button onClick={deleteAcc}>Delete Account</button>
        <br/>
        {joinRoomField}


    </div>



  );
}