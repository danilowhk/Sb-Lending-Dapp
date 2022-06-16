//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SoulBondD is ERC721 {

    address owner;
    constructor() ERC721("SoulBondD","SB-D"){
        owner = msg.sender;
    }

    function mint(address _user, uint tokenId) public {
        require(owner==msg.sender);
        _mint(_user, tokenId);
    }
}