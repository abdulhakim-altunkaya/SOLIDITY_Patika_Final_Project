import React from 'react';
import { ethers } from 'ethers';
import { useState } from 'react';
import {CONTRACT_ABI} from "./ContractABI";
import {CONTRACT_ADDRESS} from "./ContractAddress";

function WABecomeMember() {
    let[statusText, setStatusText] = useState(" ");
    let[membershipInput, setMembershipInput] = useState("");

    let signer;
    let contract;
    let provider;

    const connectContract = async () => {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    }

    const startMembership = async () => {
        await connectContract();
        const data = await contract.checkMyMembership();
        if(data === true) {
            alert("you are already a member");
            return;
        } else if(membershipInput < 10) {
            setStatusText("Zaten üyesiniz");
            return;
        } else {
            const txResponse = await contract.becomeMember(membershipInput);
            await txResponse.wait();
            setStatusText("Tebrikler");
        }
    }
  return (
    <div>
        <button onClick={startMembership}>BECOME MEMBER</button>
        <input value={membershipInput} type="number" id="burnAmount" 
        onChange={e => setMembershipInput(e.target.value)} /> <br />
        <p value={statusText}></p>

    </div>
  )
}

export default WABecomeMember;
