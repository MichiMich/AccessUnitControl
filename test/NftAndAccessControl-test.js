const { expect } = require("chai");
const { ethers } = require("hardhat");



describe("AccessControl", function () {


    let accessControl;

    beforeEach(async function () {
        //get available accounts from hardhat
        accounts = await hre.ethers.getSigners();

        //deploy contract
        const AccessControl = await hre.ethers.getContractFactory("AccessControlImplementation");
        accessControl = await AccessControl.deploy();
        await accessControl.deployed();
        console.log("AccessControl deployed at:", accessControl.address);

        const NftMintContract = await hre.ethers.getContractFactory("NftMintContract");
        nftContract = await NftMintContract.deploy(accessControl.address, 10); //link with accessControl, 10 nfts mintable
        await nftContract.deployed();
        console.log("nftMintContract deployed at:", nftContract.address);

    });


    it("MintWithAccessControl and public mint", async function () {
        //add some addresses which should be able to mint
        await accessControl.addAddressToAccessAllowed(accounts[1].address, 2);
        expect(await accessControl.getNrOfAllowedElementsPerAddress(accounts[1].address)).to.be.equal(2);

        await accessControl.addAddressToAccessAllowed(accounts[2].address, 3);
        expect(await accessControl.getNrOfAllowedElementsPerAddress(accounts[2].address)).to.be.equal(3);

        //link with nftContract
        await accessControl.linkHandshakeContract(nftContract.address);


        //so try if creator or non added can mint
        await expect(nftContract.mint()).to.be.reverted;

        //account 1 is allowed to mint 2
        await nftContract.connect(accounts[1]).mint();
        //one minted, should remain 1
        expect(await accessControl.getRemainingNrOfElementsPerAddress(accounts[1].address)).to.be.equal(1);

        //account 2 is allowed to mint 3
        await nftContract.connect(accounts[2]).mint();
        //one minted, should remain 2
        expect(await accessControl.getRemainingNrOfElementsPerAddress(accounts[2].address)).to.be.equal(2);

        //account 3 is not on allowed ones
        await expect(nftContract.connect(accounts[3]).mint()).to.be.reverted;

        //account 1 mints all his allowed ones
        await nftContract.connect(accounts[1]).mint();
        //2 minted, should remain 9
        expect(await accessControl.getRemainingNrOfElementsPerAddress(accounts[1].address)).to.be.equal(0);
        //next mint will fail
        await expect(nftContract.connect(accounts[1]).mint()).to.be.reverted;

        //finally account 2 mints his allowed left ones
        await nftContract.connect(accounts[2]).mint();
        //2 minted, should remain 1
        expect(await accessControl.getRemainingNrOfElementsPerAddress(accounts[2].address)).to.be.equal(1);
        //3 minted, should remain 0
        await nftContract.connect(accounts[2]).mint();
        expect(await accessControl.getRemainingNrOfElementsPerAddress(accounts[2].address)).to.be.equal(0);

        //open for all
        await nftContract.enablePublicMint();

        //now all wallets can mint, this is your chance account 3^^
        await nftContract.connect(accounts[3]).mint();

        //and at the end account 1 wants one more
        await nftContract.connect(accounts[1]).mint();

    });








});
