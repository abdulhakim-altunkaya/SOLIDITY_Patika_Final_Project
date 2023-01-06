import React from 'react';
import { ethers } from 'ethers';
import {CONTRACT_ADDRESS} from "./ContractAddress";
import {CONTRACT_ABI} from "./ContractABI";
import { useState } from 'react';

function RACheckMembership() {
    let[membershipStatus, setMembershipStatus] = useState("");
    let[memberAddress, setMemberAddress] = useState("");

    let provider;
    let signer;
    let contract;
    const connectContract = async () => {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    }

    const checkMembership = async () => {
        await connectContract();
        const data = await contract.seeMembers(memberAddress);
        if(data === true) {
            setMembershipStatus(`${memberAddress} is a member`);
        } else {
            setMembershipStatus(`${memberAddress} is not a member`);
        }
    }
  return (
    <div>
        <button onClick={checkMembership}>CHECK MEMBERSHIP</button>
        <input value={memberAddress} type="string"
        onChange={e => setMemberAddress(e.target.value)} />
        <p>{membershipStatus}</p>
    </div>

  )
}

export default RACheckMembership