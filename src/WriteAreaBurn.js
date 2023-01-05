import React from 'react';
import { useState } from 'react';
import { ethers } from 'ethers';
import {CONTRACT_ABI} from "./ContractABI";
import {CONTRACT_ADDRESS} from "./ContractAddress";

function WriteAreaBurn() {
  let[burnInput, setBurnInput] = useState("");

  let contract;
  let provider;
  let signer;

  const connectContract = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  }

  const removeTokens = async () => {
    connectContract();
    const txResponse = await contract.burnToken(burnInput)
    const txReceipt = await txResponse.wait();
    console.log(txReceipt);
  }

  
  return (
    <div id='writeAreaBurn'>
      <button onClick={removeTokens}>BURN PETIXCOIN TOKENS</button>
      <input value={burnInput} type="number" id="burnAmount" 
      onChange={e => setBurnInput(e.target.value)} />
    </div>
  )
}

export default WriteAreaBurn