import React from 'react';
import { ethers } from 'ethers';
import { useState } from 'react';
import {CONTRACT_ABI} from "./ContractABI";
import {CONTRACT_ADDRESS} from "./ContractAddress";

function RAMyBalance() {
  let [myBalance, setMyBalance] = useState("");

  let signer;
  let provider;
  let contract;

  const connectContract = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  }

  const getMyBalance = async () => {
    await connectContract();
    const data1 = await contract.getYourBalance();
    const data2 = await data1.toString();
    setMyBalance(`Your Balance is ${data2}`);
  }
  return (
    <div>
        <p><button onClick={getMyBalance}>SEE MY BALANCE</button> <br />
        {myBalance} </p>
    </div>
  )
}

export default RAMyBalance