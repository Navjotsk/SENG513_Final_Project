import React from "react";
import { useState } from "react";

//elicitinfo is a component used as a textbox in the userinfo
export default function ElicitInfo( {funct, action, hidden="false"} ) {

const [input, setInput] = useState("");
let inputField = "";
if (hidden =="true") {
  inputField = <input class="infoField" value={input} onChange={handleChange} type="password"/>
} else {
  inputField = <input class="infoField" value={input} onChange={handleChange}/>
}

function handleSubmit (event) {
    //add user logic passed in
    console.log("submit");
    event.preventDefault();
    console.log("got submit" + input);
    funct(input);
}

function handleChange (event) {
    setInput(event.target.value);
}



  return (
    <form onSubmit={handleSubmit}>
    <label>
      {action}
      {inputField}
    </label>
    <input class="infoButton" type="submit" value="Submit" />
  </form>
  );
}