import React from "react";
import { useEffect, useState } from "react";

export default function SubmitField( {addUser, action} ) {

const [newUser, setNewUser] = useState("");

function handleSubmit (event) {
    //add user logic passed in
    event.preventDefault();
    addUser(newUser);
}

function handleChange (event) {
    setNewUser(event.target.value);
}



  return (
    <form onSubmit={handleSubmit}>
    <label>
      {action}
      <input class="SubmitField" value={newUser} onChange={handleChange}/>
    </label>
    <input class="SubmitButton" type="submit" value="Submit" />
  </form>
  );
}