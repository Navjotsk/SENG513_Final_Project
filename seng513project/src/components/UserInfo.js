import React from "react";
import { useEffect, useState } from "react";
import userLogo from './userSymbol.png';
import Button from './Button.js';


export default function UserInfo({user = "undefined", date ="undefined", games = 0,changeNickname, changePassword, deleteAccount}) {
    let gameString = games + ' ';
    function newNickname () {
        //console.log("requested nickname change");
        let newname = window.prompt("enter your new nickname");
        changeNickname(user, newname);
    }

    function resetPassword () {
        let pass = window.prompt("enter your new password");
        changePassword(user, pass);
    }

    function deleteAcc () {
        deleteAccount();
    }


  return (
    <div class="mainUserInfo">
        <img src={userLogo} alt="..." />&nbsp;{user}&nbsp;
        <br/>
        <br/>
        <>Joined: {date}</>
        <br/>
        <br/>
        <>Games Played: {gameString}</>
        <br/>
        <br/>
        <button onClick={newNickname}>Change Nickname</button>
        <br/>
        <button onClick={resetPassword}>Change Password</button>
        <br/>
        <button onClick={deleteAcc}>Delete Account</button>


    </div>



  );
}