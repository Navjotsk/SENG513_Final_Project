import React from "react";
import { useEffect, useState } from "react";
import userLogo from './userSymbol.png';

export default function SubmitField( {addUser} ) {

const [username, setUsername] = useState(null);
const [newUser, setNewUser] = useState(null);

function handleSubmit (event) {
    //add user logic passed in
    console.log("submit");
    event.preventDefault();
    addUser(newUser);
}

function handleChange (event) {
    setNewUser(event.target.value);
}



  return (
    <form onSubmit={handleSubmit}>
    <label>
      Add User:
      <input value={newUser} onchange={handleChange}/>
    </label>
    <input type="submit" value="Submit" />
  </form>
  );
}