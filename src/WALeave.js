import React from 'react';
import { ethers } from 'ethers';
import { useState } from 'react';
import {CONTRACT_ADDRESS} from "./ContractAddress";
import {CONTRACT_ABI} from "./ContractABI";

function WALeave() {
    let[statusInfo, setStatusInfo] = useState(false);

    let signer;
    let contract;
    let provider;
    const connectContract = async () => {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    }

    const leaveMembership = async () => {
      await connectContract();
      const txResponse = await contract.leaveMembership();
      await txResponse.wait();
      setStatusInfo(true)
    }

  return (
    <div>
        <button onClick={leaveMembership} style={{backgroundColor: "#ff002b", color: "white"}}>LEAVE MEMBERSHIP</button> <br />
        { statusInfo ? <p>You are no longer one of us.</p> : <p></p>}
    </div>

  )
}

export default WALeave;