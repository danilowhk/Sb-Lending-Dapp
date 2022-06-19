//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SoulBondS is ERC721 {

    address owner;
    uint public counter;
    constructor() ERC721("SoulBondS","SB-S"){
        owner = msg.sender;
        mint(owner);
        mint(owner);
        
    }

    function mint(address _user) public {
        require(owner==msg.sender);
        _mint(_user, counter);
        counter+=1;
    }

          function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        revert();
    }

      function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public virtual override {
        revert();
    }

     function _safeTransfer(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) internal virtual override{
        revert();
    }

      function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override{
        revert();
    }
}