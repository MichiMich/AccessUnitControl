# AccessUnitControl

allows added wallets given nr of accesses to linked contract


## use case
- Whitelist for ERC721/nft contracts.
- AccessUnit limitation with another contract

## examples
I made a nft contract with wl access and publicMint if switched by owner [here](https://github.com/MichiMich/NftWithWhitelist)

## dependencies
as for now the linked contract needs to have this function 
```
function balanceOf(address owner) public view virtual returns (uint256);
```
this is the handshake between the contract and the linked one for getting the already used/minted nr of access/elements, needed if firing the <code></code>

## step by step
link with contract which should have an AccessUnitControl by using the <code>getRemainingNrOfElementsPerAddress()</code> function.
add wallet and number of allowed accesses to AccessUnitControl contract.
repeat adding wallets and numbers for wanted addresses

## properties/specialities
- you can update the number of allowed accesses anytime by adding the wallet with the new wanted number. If same data should be added twice it gets reverted (fired by require).
- single addresses can be removed from allowed access
- all given addresses can be removed from allowed access
- addresses can be updated added whenever wanted

## reusability for multiple contracts
- the contract can be relinked/linked with another contract by using the <code>linkHandshakeContract()</code> function. 
- all added addresses or single ones can be removed by firing the <code>removeAllFromAccessAllowed()</code> function



## Prerequisites
<ul  dir="auto">
<li><a  href="https://nodejs.org/en/download/"  rel="nofollow">Nodejs and npm</a>
You'll know you've installed nodejs right if you can run:


```
node --version
```
 and get an ouput like: <code>vx.x.x</code>
</ul>
<ul  dir="auto">
<li><a  href="https://hardhat.org/getting-started/"  rel="nofollow">hardhat</a>
You'll know you've installed hardhat right if you can run:

```
npx hardhat --version
```
and get an ouput like: <code>2.9.3</code>
</ul>
<ul  dir="auto">
A webbrowser, since you can read this here I should not have to  mention it^^
</ul>
<ul  dir="auto">
Basic understand of js, hardhat and solidity. If you want to get basic understanding up to expert I highly recommend
the man, the myth, the legend: <a href="https://www.youtube.com/watch?v=M576WGiDBdQ&t=10s">Patrick Collins</a>
</ul>
<ul  dir="auto">
Some rinkeby eth if you deploying to rinkeby testnet, you could grap some <a href="https://faucets.chain.link/rinkeby">here</a>
</ul>



## dependencies
install dependencies: 
```
npm install --save-dev @openzeppelin/contracts @nomiclabs/hardhat-etherscan @nomiclabs/hardhat-waffle chai dotenv
```


## For the fast runners
## clone repository
fire up the git clone command: 
```
git clone https://github.com/MichiMich/AccessUnitControl
```

## cd into it
```
cd AccessUnitControl
```

## and deploy/mint it:
a) to local hardhat: 
```
npx hardhat run scripts/deploy.js
```

b) rinkeby: 
**never share your private keys with anyone! I highly recommend you to create a new wallet only for testing contracts, dont use your wallets with actual money on it!! Please friend be save, better save than sorry! If you want to push your data on github, add the <code>.env</code> at the .gitignore file**

I used 1 wallet for the deploy script, so you can add the private key at .env.

fill in your <a href="https://www.alchemy.com/">alchemy url</a> at the .env file at <code>URL_RINKEBY</code> and deploy it on rinkeby with 
```
npx hardhat run scripts/deploy.js --network rinkeby
```
