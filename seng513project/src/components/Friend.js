import React from "react";
import { useEffect, useState } from "react";
import userLogo from './userSymbol.png';


export default function Friend({un = "Deleted User", removeUser, startGame}) {

const [username, setUsername] = useState(un);
function removeRequest() {
  removeUser(un);
}
function startRequest() {
  startGame(un);
}

  return (
    <row class="friendIcon">
        <span class="userLogoImage">
            <img src={userLogo} alt="..." />&nbsp;{username}&nbsp;
        </span>
        <span class="RequestGame">
            <button onClick = {startRequest}>Request Game</button>&nbsp;
        </span>
        <span class="removeFriend">
            <button onClick = {removeRequest}>X</button>
        </span>
        <br/>
    </row>
  );
}