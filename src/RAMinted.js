import React from 'react';
import { ethers } from 'ethers'
import { CONTRACT_ADDRESS } from './ContractAddress';
import { CONTRACT_ABI } from "./ContractABI";
import { useState } from 'react';

function RAMinted() {
    let [totalMinted, setTotalMinted] = useState("");
    
    let signer;
    let provider;
    let contract;

    const connectContract = async () => {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    }

    const getTotalSupply = async () => {
      await connectContract();
      const data1 = await contract.getTotalSupply();
      const data2 = await data1.toString();
      setTotalMinted(`The number of total minted tokens until now: ${data2}`);
    }
    return (
        <p><button onClick={getTotalSupply}>SEE TOTAL MINTED TOKENS</button> <br />
         {totalMinted}</p>
    )
}

export default RAMinted;