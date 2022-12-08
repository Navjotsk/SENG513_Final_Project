import React from "react";
import { useEffect, useState } from "react";
import userLogo from './userSymbol.png';
import Button from './Button.js';


export default function UserInfo({user = "undefined", date ="undefined", games = 0 }) {
    let gameString = games + ' ';
    function changeNickname () {
        console.log("requested nickname change");
    }

    function resetPassword () {
        console.log("requested to reset password");
    }

    function deleteAccount () {
        console.log("requested to delete account");
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
        <Button type="Change Nickname" doOnClick={changeNickname} />
        <br/>
        <Button type="Reset Password" doOnClick={resetPassword} />
        <br/>
        <Button type="Delete Account" doOnClick={deleteAccount} />



    </div>



  );
}