import {ethers} from 'ethers';
import deploy from './deploy';
import addContract from './addContract';
import "./index.scss";

const server = 'http://localhost:3042';

let contracts = 0;
async function newContract() {
  const beneficiary = document.getElementById("beneficiary").value;
  const arbiter = document.getElementById("arbiter").value;
  const value = ethers.utils.parseEther(document.getElementById("wei").value);
  const contract = await deploy(arbiter, beneficiary, value);
  addContract(++contracts, contract, arbiter, beneficiary, value);
  const myreq = `${server}/send/${arbiter}/${beneficiary}/${ethers.utils.formatEther(value)}`;
  const request = new Request(myreq, { method: 'POST' });
  try{
    await fetch(request);
  }
  catch(err){
    console.log(err);
  }  
}

async function loadContracts() {
  const myreq = `${server}/contracts`;
  const response = await fetch(myreq);
  const responseArr = await response.json();
  contracts = responseArr.length;
  const container = document.getElementById("container");
  for(let i=0; i<contracts; i++){
    const item = responseArr[i];
    container.innerHTML += `
      <div class="existing-contract">
        <ul className="fields">
          <li>
            <div> Arbiter </div>
            <div> ${item.arbiter} </div>
          </li>
          <li>
            <div> Beneficiary </div>
            <div> ${item.beneficiary} </div>
          </li>
          <li>
            <div> Value </div>
            <div> ${item.value} ETH </div>
          </li>
          <div class="button" id="${i}">
            Approve
          </div>
        </ul>
      </div>
    `;
  }
}

document.getElementById("deploy").addEventListener("click", newContract);
loadContracts();