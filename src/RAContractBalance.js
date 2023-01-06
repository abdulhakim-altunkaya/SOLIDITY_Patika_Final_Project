import React from 'react';
import { ethers } from 'ethers';
import {CONTRACT_ABI} from "./ContractABI";
import {CONTRACT_ADDRESS} from "./ContractAddress";
import { useState } from 'react';

function RAContractBalance() {
    let[contractBalance, setContractBalance] = useState(" ");

    let signer;
    let contract;
    let provider;
    const connectContract = async () => {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    }

    const getContractBalance = async () => {
        await connectContract();
        const data1 = await contract.getContractBalance();
        const data2 = await data1.toString(); // bigNumber hatası almamak için bunu yapıyorum.
        setContractBalance(`Contract Balance is: ${data2}`)
    }
  return (
    <div>
        <p><button onClick={getContractBalance}>SEE CONTRACT BALANCE</button> <br />
        {contractBalance} </p>
    </div>
  )
}

export default RAContractBalance