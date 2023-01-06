import React, { useState } from 'react'
import RAMinted from './RAMinted';
import RAMyBalance from "./RAMyBalance";
import RAContractBalance from "./RAContractBalance";
import RACheckMembership from './RACheckMembership';

const ReadArea = () => {
    let[displayStatus, setDisplayStatus] = useState("none"); // kontrat bilgileri görüntüleme durumunu bu variabla kaydediyorum
    const { ethereum } = window;
    let[account, setAccount] = useState("");

    const connectMetamask = async () => {
      if (window.ethereum !== "undefined") {
        const accounts = await ethereum.request({ method: "eth_requestAccounts"});
        setAccount(accounts[0]);
        displayStatus === "none" ? setDisplayStatus("block") : setDisplayStatus("none"); //Kontrat bilgilerini toggle yapıyorum burda.
      } else {
        setAccount("Please install Metamask to your browser")
      }
    }

    return (
        <div id="readArea">
            <p><button onClick={connectMetamask}>CONNECT TO METAMASK</button> <br /></p>
            <div id='contractDetailsSpan' style={{display: `${displayStatus}`}}>
              <span>Your Metamask Account:</span>  <br />{account} <br /> 
              <span>PetixCoin Token Symbol:</span>  PETIX <br />
              <span>PetixCoin Token Cap: </span>  10000 <br />
              <span>PetixCoin Token Standard:</span>  ERC20 <br />
              <span>PetixCoin Token Decimals:</span>  18 <br />
              <span>PetixCoin Token Mainnet:</span>  Fantom Testnet <br />
              <span>PetixCoin Token Contract Account:</span>  0x516750245bBE7bcAc56f04486Ad6514A4594e28D<br />  
            </div>

            <RAMyBalance />
            <RAContractBalance />
            <RACheckMembership />
            <RAMinted />
        </div>
    )
}

export default ReadArea