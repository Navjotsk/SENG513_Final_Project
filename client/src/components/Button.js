import React from "react";
import { useEffect, useState } from "react";


export default function Button( {type} ) {


  return (
    <button class="profileButton">{type}</button>
  );
}

