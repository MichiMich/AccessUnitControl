const { expect } = require("chai");
const { ethers } = require("hardhat");



describe("AccessControl", function () {

    beforeEach(async function () {
        //get available accounts from hardhat
        accounts = await hre.ethers.getSigners();

        const NftMintContract = await hre.ethers.getContractFactory("NftMintContract");
        nftContract = await NftMintContract.deploy(ethers.constants.AddressZero, 10); //link with accessControl (0 address given, we use public mint here), 10 nfts mintable
        await nftContract.deployed();
        console.log("nftMintContract deployed at:", nftContract.address);

    });

    it("Mintout at public mint", async function () {
        //add some addresses which should be able to mint
        const totalNftSupply = await nftContract.totalSupply();
        console.log("total nft supply: ", totalNftSupply);

        //open for all, access test is done in NftAndAccessControl-test.js
        await nftContract.enablePublicMint();

        //mint out, account1 and account2 are minting
        for (let i = 0; i < totalNftSupply; i++) {
            console.log("loop counter: ", i);
            if (i % 2 == 0) {
                await nftContract.connect(accounts[1]).mint();
            }
            else {
                await nftContract.connect(accounts[2]).mint();
            }
        }
        await expect(nftContract.connect(accounts[1]).mint()).to.be.reverted;


    });








});
