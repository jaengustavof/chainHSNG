const { ethers } = require("hardhat");


async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  
  const chainHousing = await ethers.getContractFactory("chainHousing");
  const chainhousing = await chainHousing.deploy(); //0 tokens al deploy
  const ERC20Basic = await ethers.getContractFactory("ERC20Basic");
  const erc20 = await ERC20Basic.deploy(0);


  // Save copies of each contracts abi and address to the frontend.
  saveFrontendFiles(chainhousing, "chainHousing"); //nombre variable linea 11, "Alias"
  saveFrontendFiles(erc20, "ERC20Basic"); //nombre variable linea 11, "Alias"
}

function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../frontend/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });