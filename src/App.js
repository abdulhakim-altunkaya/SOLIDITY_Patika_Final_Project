import ReadArea from "./ReadArea";
import WriteArea from "./WriteArea";
import React from "react";

function App() {

  return (
    <div className="App">
        <div id="upperBar">
            <img id="imageIcon" src="melonBig.png" alt="PetixCoin token symbol" />
            <div id="titleBar">PETIXCOIN CLUB</div>
        </div>
        
        <div id="mainArea">
            <ReadArea/>
            <WriteArea/>

        </div>
        <p id="footnote">By Abdulhakim Altunkaya, 2023 <br />
        Project created for Patika Paribu cohort <br />
        https://github.com/abdulhakim-altunkaya/SOLIDITY_Patika_Final_Project
        </p>

    </div>
  );
}
export default App;

