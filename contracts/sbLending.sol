//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract sbLending{

    address[] public soulBondList;
    mapping(address => uint8) public soulBondCategories;
    mapping(uint8 => uint) public categoryPower;

    // mapping(address => mapping(address => uint256)) public ERC20borrowList;
    // mapping(address => mapping(address => uint256)) public ERC20lendList;
    mapping(address => uint256) public ethDepositList;
    mapping(address => uint256) public ethBoworredList;
    mapping(address => uint256) internal depositBlock;
    mapping(address => bool) public allowedBorrowedTokens;
    // mapping(address => bool) public allowedLendTokens;


    uint256 public baseMaxBorrow = 70;


    function depositEth() public payable {

        require(msg.value > 0);
        depositBlock[msg.sender] = block.number;
        ethDepositList[msg.sender] +=msg.value;

    }

    function withdrawEth(uint256 _value) public {
        require(value>=ethDepositList[msg.sender]);
        //Update Balance
        ethDepositList[msg.sender] -= _value;
        (bool success,) = address(msg.sender).call{ value: value }("");
        require(success);
    }

    function borrowEth(uint256 _value) public {
        //Require that ethBorrowedList[msg.sender] + _value > MaximumBorrow% * TotalDepositValue(in usd);

        totalAllowedBorrow -= _value;
        ethBorrowedList[msg.sender] += _value;
        (bool success,) = address(msg.sender).call{ value: value }("");
        require(success);
        //Record Borrow Block
    }

    function payBackEth() public payable{
        //update total ethBorrowedList + interest
        //require ethBorrowedList[msg.sender] >= msg.value 
        totalAllowedBorrow += msg.value;
        ethBorrowedList[msg.sender] -= msg.value;
    }

    function liquidate(address _user) public {
        //update user ethBorrowedList + interest
        //require ethBorrowedList[msg.sender] > ethAllowedBorrow;
        //Liquidate token with Higher Liquidity, if not enough get token with second highest liquidity and on.
        uint liquidationValue = 0.2*ethDepositList;
        //0.2 needs to be calculated based on current %
        ethDepositList[msg.sender] -= liquidationValue;
        //send token to uniswap
        //take fees
        //call payBackEth{value: liquidationValue};
        //update 

    }

    function addSoulBondToken(address _token, uint8 category) external {
        require(msg.sender == owner);
        require(category > 0);
        soulBondList.push(_token);
        soulBondCategories[_token] = category;
    }

  
    function calculateMaxBorrow(address _user) public view returns(uint256) {
        uint256 maxBorrow = baseMaxBorrow;
        for(uint i; i < soulBondList.length ; i++){
            // if(ERC721(soulBondList).balanceOf(_user)>0){
            //     maxBorrow += categoryPower[soulBondCategories[soulBondList[i]]];
            // }
        }

        return maxBorrow;
    }


    function calculateTotalBorrowedEth(address _userAddress) view public returns(uint256 totalBorrowEth){
        uint256 ethPrice = 100;
        totalBorrowEth = ethBorrowList[_userAddres]*ethPrice;
        return totalBorrowEth;
        //function that calculates the total amount Borrowed in $

    }

    function calculateTotalDepositEth(address _userAddress) view public returns(uint256 totalDepositEth){
        uint256 ethPrice = 100;
        totalDepositEth = ethDepositList[_userAddress]*ethPrice;
        return totalDepositEth;
    }


    function depositERC20(address _token, uint256 _value) public {
        require(IERC20(_token).allowance(this) > _value);
        IERC20(_token).transferFrom(this, _value);
        ERC20DepositList[_token][msg.sender] += _value;
        //check Register Block Number
    }

    function borrowERC20(address _token, uint256 _value) public {
        //update TotalBorrowed/TotalDeposit value with interest
        //require calculateTotalBorrowed + _value < calculateTotalDeposit * calculateMaxBorrow;
        ERC20BorrowList[_token][msg.sender] += _value;
        IERC20(_token).transfer(msg.sender);

    }


    


    function vaultHealthFactor() public {
        //calculate the entire Vault Health Factor
        // this cannot go over 90% Total boworred = Total Lend
    }

    function borrowInterestRate() public{
        //calculate  - Borrow will pay more interest
    }

    function lendInterestRate() public{
        //Lenders - with better interest then avarage Compound

    }

        //lendInterest < borrowInterest
        //pay more interest lower liquidation price;

    function tokenBorrowInterstRate(address _token) public {
        //fixed?
    }

    function tokenLendInterestRate(address _token) public {
        //fixed?
    }

    function addBorrowToken(address _token) public {
        require(msg.sender == owner);
        allowedBorrowedTokens[_token] = true;
        //this would add a new token to be borrowed
    }

    function addDepositToken(address _token) public {
        allowedDepositTokens[_token] = true;
        //this would add a new token to be a lend
    }


    function editCategories(uint8 _category, uint _power) public {
        require(msg.sender == owner);
       categoryPower[_category] = _power;
    }


    modifier checkBorrowList(address _token){

        require(allowedBorrowedTokens[_token]);
        _;

        //when borrowing check if token is allowed on our Vault
    }

    modifier checkLendList(address _token){

        require(allowedDepositTokens[_token]);
        _;
    }