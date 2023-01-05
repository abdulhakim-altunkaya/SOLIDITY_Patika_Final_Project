import React from 'react';
import WABurn from "./WABurn.js";
import WAMint from "./WAMint.js";
import WABecomeMember from "./WABecomeMember.js";

function WriteArea() {

  return (
    <div id="writeArea">
      <WAMint />
      <WABurn />
      <WABecomeMember />
    </div>
  )
  
}

export default WriteArea