// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract SouldBondC is ERC721 {
    address owner;
    uint public counter;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("SoulBondC","SB-C") {
        owner=msg.sender;
        mint(owner);
        
    }

    function mint(address player) public {
        require(msg.sender==owner);
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);

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
    ) internal virtual override {
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

