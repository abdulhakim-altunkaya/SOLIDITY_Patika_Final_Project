const hre = require("hardhat");

async function main() {
  const PetixCoin = await hre.ethers.getContractFactory("PetixCoin");
  const petixCoin = await PetixCoin.deploy(10000);
  await petixCoin.deployed();
  console.log( `petixCoin deployed to ${petixCoin.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
