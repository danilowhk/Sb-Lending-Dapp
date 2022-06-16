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