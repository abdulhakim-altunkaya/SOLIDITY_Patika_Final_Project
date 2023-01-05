import React, { useState } from 'react'
import {CONTRACT_ABI} from "./ContractABI";
import {CONTRACT_ADDRESS} from "./ContractAddress";
import { ethers } from 'ethers';

function WriteAreaMint() {
  let[mintInput, setMintInput] = useState();


  let provider;
  let signer;
  let contract;
  const connectContract = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  }

  const getTokens = async () => {
    await connectContract();
    const txResponse = await contract.mintToken(mintInput);
    await txResponse.wait();
  }

  return (
    <div id='writeAreaMint'>
        <button onClick={getTokens}>MINT PETIXCOIN TOKENS</button>
        <input value={mintInput} type="number" id="mintAmount" 
        onChange={e => setMintInput(e.target.value)} /> <br />
        1) On the left, click on "Connect to Metamask" <br />
        2) Copy PetixCoin Token Contract Address <br />
        3) Open Metamask, make sure you are on "Fantom Testnet", <br />
        4) On Metamask, click on "import tokens" <br />
        5) Paste PetixCoin Token Contract Address in "Token Contract Address" <br />
        6) Wait 5 seconds and then click on "Add Custom Token". <br />
        7) You can mint between 1 to 30 tokens.
    </div>
  )
}

export default WriteAreaMint