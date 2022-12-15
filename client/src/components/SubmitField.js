import React from "react";
import { useEffect, useState } from "react";

//this field is rendered in a friendslist to allow users to submit
export default function SubmitField( {addUser, action} ) {

const [newUser, setNewUser] = useState("");
//this function handles when a user clicks submit and calls the parent function to add a user
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