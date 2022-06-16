//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SoulBondS is ERC721 {

    address owner;
    constructor() ERC721("SoulBondS","SB-S"){
        owner = msg.sender;
    }

    function mint(address _user, uint tokenId) public {
        require(owner==msg.sender);
        _mint(_user, tokenId);
    }
}