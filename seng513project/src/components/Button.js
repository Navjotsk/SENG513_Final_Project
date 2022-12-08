import React from "react";
import { useEffect, useState } from "react";


export default function Button( {type, doOnClick} ) {


  return (
    <button class="profileButton">{type}</button>
  );
}

