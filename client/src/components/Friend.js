import React from "react";
import userLogo from '../images/userSymbol.png';

//one friend is one component representing an entry in the friendslist
//user logo is from https://www.pngegg.com/en/png-hezlx
export default function Friend({un = "Deleted User", removeUser, startGame, id}) {


function removeRequest() {
  removeUser(id, un);
}
function startRequest() {
  console.log(un);
  startGame(un);
}

  return (
    <row class="friendIcon">
        <span class="userLogoImage">
            <img src={userLogo} alt="..." />{un}
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