import React from "react";
import { useEffect, useState } from "react";

export default function ElicitInfo( {funct, action} ) {

const [input, setInput] = useState("");

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
      <input class="infoField" value={input} onChange={handleChange}/>
    </label>
    <input class="infoButton" type="submit" value="Submit" />
  </form>
  );
}