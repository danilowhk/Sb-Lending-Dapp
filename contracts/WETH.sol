
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract WETHToken is ERC20 {

    address owner;
    constructor() ERC20("WETHToken","WETH"){
        owner = msg.sender;
        mint(100000000);

    }

    function mint(uint256 _value) public {
        // require(msg.sender == owner);
        _mint(msg.sender,_value);
    }
}