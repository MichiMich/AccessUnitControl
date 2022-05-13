// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; //>=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NftMintContract is ERC721, Ownable {
    address s_accessControlContractAddress;
    uint256 s_currenTokenId;
    uint256 s_totalTokenSupply;
    bool s_publicMintActive; //0=whitelist activated, 1=whitelist deactivated->public mint

    constructor(
        address _accessControlContractAddress,
        uint256 _totalTokenSupply
    ) ERC721("OnChainAsciiApes", "^.^") {
        s_accessControlContractAddress = _accessControlContractAddress;
        s_totalTokenSupply = _totalTokenSupply;
    }

    function mint() public payable {
        require(s_currenTokenId < s_totalTokenSupply, "no more tokens to mint");
        if (!s_publicMintActive) {
            //check if access is granted
            require(checkIfWhitelisted(msg.sender), "not whitelisted");
        }
        _safeMint(msg.sender, s_currenTokenId);
        s_currenTokenId += 1;
    }

    //deactivate accessControl
    function enablePublicMint() public onlyOwner {
        s_publicMintActive = true;
    }

    function totalSupply() public view returns (uint256) {
        return (s_totalTokenSupply);
    }

    //interact with accessControl
    function checkIfWhitelisted(address _addressToBeChecked)
        public
        view
        returns (bool)
    {
        accessControlImpl accessControl = accessControlImpl(
            s_accessControlContractAddress
        );
        return (accessControl.isAccessGranted(_addressToBeChecked));
    }
}

abstract contract accessControlImpl {
    function isAccessGranted(address _adressToBeChecked)
        public
        view
        virtual
        returns (bool);
}
