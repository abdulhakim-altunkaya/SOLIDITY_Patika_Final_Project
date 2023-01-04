import React, { useState } from 'react'
import ReadAreaMinted from './ReadAreaMinted';

const ReadArea = () => {

    const { ethereum } = window;
    let[account, setAccount] = useState("");

    const connectMetamask = async () => {
      if (window.ethereum !== "undefined") {
        const accounts = await ethereum.request({ method: "eth_requestAccounts"});
        setAccount(accounts[0]);
      } else {
        setAccount("Please install Metamask to your browser")
      }
    }

    return (
        <div id="readArea">
            <p><button onClick={connectMetamask}>CONNECT TO METAMASK</button> <br />
            Your Metamask Account: <br />{account} <br /> </p>
            PetixCoin Token Symbol: PETIX <br />
            PetixCoin Token Cap: 10000 <br />
            PetixCoin Token Standard: ERC20 <br />
            PetixCoin Token Decimals: 18 <br />
            PetixCoin Token Mainnet: Fantom Testnet <br />
            PetixCoin Token Contract Account: <br />  
            <ReadAreaMinted />
        </div>
    )
}

export default ReadArea