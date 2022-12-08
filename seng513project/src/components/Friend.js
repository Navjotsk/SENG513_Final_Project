import React from "react";
import { useEffect, useState } from "react";
import userLogo from './userSymbol.png';


export default function Friend({un = "Deleted User"}) {

const [username, setUsername] = useState(un);

  return (
    <row class="friendIcon">
        <span class="userLogoImage">
            <img src={userLogo} alt="..." />&nbsp;{username}&nbsp;
        </span>
        <span class="RequestGame">
            <button>Request Game</button>&nbsp;
        </span>
        <span class="removeFriend">
            <button>X</button>
        </span>
        <br/>
    </row>
  );
}