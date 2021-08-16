import {ethers} from 'ethers';

const provider = new ethers.providers.Web3Provider(ethereum);

export default async function addContract(id, contract, arbiter, beneficiary, value) {
  const buttonId = `approve-${id}`;

  const container = document.getElementById("container");
  container.innerHTML += createHTML(buttonId, arbiter, beneficiary, value);

  contract.on('Approved', () => {
    document.getElementById(buttonId).className = "complete";
    document.getElementById(buttonId).innerText = "✓ It's been approved!";
  });

  document.getElementById(buttonId).addEventListener("click", async () => {
    const signer = provider.getSigner();
    await contract.connect(signer).approve();
  });
}

export function createHTML(buttonId, arbiter, beneficiary, value) {
  return `
    <div class="existing-contract">
      <ul className="fields">
        <li>
          <div> Arbiter </div>
          <div> ${arbiter} </div>
        </li>
        <li>
          <div> Beneficiary </div>
          <div> ${beneficiary} </div>
        </li>
        <li>
          <div> Value </div>
          <div> ${ethers.utils.formatEther(value)} ETH </div>
        </li>
        <div class="button" id="${buttonId}">
          Approve
        </div>
      </ul>
    </div>
  `;
}
