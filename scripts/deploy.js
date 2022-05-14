// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  //deploy contract
  const AccessControl = await hre.ethers.getContractFactory("AccessUnitControl");
  const accessControl = await AccessControl.deploy();
  await accessControl.deployed();
  console.log("AccessControl deployed at:", accessControl.address);

  const NftMintContract = await hre.ethers.getContractFactory("NftMintContract");
  nftContract = await NftMintContract.deploy(accessControl.address, 10); //link with accessControl, 10 nfts mintable
  await nftContract.deployed();
  console.log("nftMintContract deployed at:", nftContract.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
