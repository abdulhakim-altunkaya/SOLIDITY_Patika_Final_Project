import React from 'react';
import WABurn from "./WABurn.js";
import WAMint from "./WAMint.js";
import WABecomeMember from "./WABecomeMember.js";
import WALeave from "./WALeave";

function WriteArea() {

  return (
    <div id="writeArea">
      <WAMint />
      <WABurn />
      <WABecomeMember />
      <WALeave />
    </div>
  )
  
}

export default WriteArea;