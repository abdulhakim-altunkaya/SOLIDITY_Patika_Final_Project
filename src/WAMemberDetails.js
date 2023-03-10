import React from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from "./ContractAddress";
import { CONTRACT_ABI } from "./ContractABI";
import { useState } from 'react';

function WAMemberDetails() {
    
    let[memberId, setMemberId] = useState("");
    let[memberHistory, setMemberHistory] = useState("");

    let provider;
    let signer;
    let contract;
    const connectContract = async () => {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);    
    }

    const getMemberHistory = async () => {
      await connectContract();
      const txResponse = await contract.seeMembershipDetails(memberId);
      const dataAddress = await txResponse.member;
      const dataAmount1 = await txResponse.amount;
      const dataAmount2 = dataAmount1.toString();
      setMemberHistory(`${dataAddress} has paid ${dataAmount2} PetixCoin when becoming member`)
    }

    return (
      <div>
          <button onClick={getMemberHistory}>SEE MEMBERSHIP HISTORY</button>
          <input value={memberId} type="number" placeholder='enter member id'
          onChange={e => setMemberId(e.target.value)} />
          <p>{memberHistory}</p>
      </div>
    )
}

export default WAMemberDetails