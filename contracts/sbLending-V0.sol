//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract sbLending{


    


    address[] public soulBondList;
    mapping(address => uint8) public soulBondCategories;
    mapping(uint8 => uint) public categoryPower;

    mapping(address => mapping(address => uint256)) public ERC20BorrowList;
    mapping(address => mapping(address => uint256)) public ERC20DepositList;
    mapping(address => bool) public allowedBorrowedTokens;
    mapping(address => bool) public allowedDepositTokens;
    mapping(address => mapping(address => uint256)) public userLastTokenUpdate;

    address[] public ERC20BorrowTokens;
    address[] public ERC20DepositTokens;

    uint256 public baseMaxBorrow = 70;

    //For this contract we are using fixed interest Rate and Fixed Prices for feature test purposes

    mapping(address => uint256) public tokenFixedInterestRate;
    mapping(address => uint256) public tokenFixedPrice;

    function addTokenInteresFixedInterestRate(address _token, uint256 _interestRate) public {
        tokenFixedInterestRate[_token] = _interestRate;
    }

    function addTokenInteresFixedPrice(address _token, uint256 _fixedPrice) public {
        tokenFixedPrice[_token] = _fixedPrice;
    }


    function getInterestRate(address _token) public returns(uint256){
        return tokenFixedInterestRate[_token];
    }

    function getTokenPrice(address _token) public returns(uint256){
        return tokenFixedPrice[_token];
    }



    /**
   * @notice Function to liquidate a non-healthy position collateral-wise, with Health Factor below 1
   * - The caller (liquidator) covers `debtToCover` amount of debt of the user getting liquidated, and receives
   *   a proportionally amount of the `collateralAsset` plus a bonus to cover market risk
   * @param collateralAsset The address of the underlying asset used as collateral, to receive as result of the liquidation
   * @param debtAsset The address of the underlying borrowed asset to be repaid with the liquidation
   * @param user The address of the borrower getting liquidated
   * @param debtToCover The debt amount of borrowed `asset` the liquidator wants to cover
   * @param receiveAToken True if the liquidators wants to receive the collateral aTokens, `false` if he wants
   * to receive the underlying collateral asset directly
   **/
  function liquidationCall(
    address collateralAsset,
    address debtAsset,
    address user,
    uint256 debtToCover,
    // bool receiveAToken
  ) external {
      //Validate Liquidation call (can only go up to 50% ratio)
      require(IERC20(debtAsset).approve() > debtToCover);
      payBackERC20(debtToCover);
      ERC20BorrowList[debtAsset][user] -= debtToCover;
      IERC20(debtAsset).transferFrom(msg.sender, this.address, debtToCover);
     uint totalTransferAmount = debtToCover/tokenFixedPrice[collateralAsset]*105/100; //5% fee
      // or uint totalTransferAmount = debtToCover*tokenFixedPrice[debtAsset]/tokenFixedPrice[collateralAsset]
      ERC20DepositList[collateralAsset][user] -= totalTransferAmount;

      IERC20(collateralAsset).transfer(msg.sender, totalTransferAmount);


  }

    function addSoulBondToken(address _token, uint8 category) external {
        require(msg.sender == owner);
        require(category > 0);
        soulBondList.push(_token);
        soulBondCategories[_token] = category;
    }

  
 

    function updateBalanceWithInterestRate(address _token) public {
        uint256 lastUpdate = userLastTokenUpdate[msg.sender][_token];
        userLastTokenUpdate[msg.sender][_token] = block.timestamp;
        uint256 value = (block.timestamp - lastUpdate)*tokenFixedInterestRate[_token];
        ERC20DepositList[_token][msg.sender] += value;
    }

    function updateAllBalances() public {
        for(uint i; i < allowedDepositTokens.length ;i++){
            updateBalanceWithInterestRate[allowedDepositTokens[i]];
        }
    }


    function depositERC20(address _token, uint256 _value) public {

        require(IERC20(_token).allowance(this) > _value);
        updateAllBalances();
        IERC20(_token).transferFrom(this, _value);
        ERC20DepositList[_token][msg.sender] += _value;

    }

    function withdrawERC20() public {

    }

    function calculateMaxBorrow(address _user) public view returns(uint256) {
        uint256 maxBorrow = baseMaxBorrow;
        for(uint i; i < soulBondList.length ; i++){
            if(ERC721(soulBondList).balanceOf(_user)>0){
                maxBorrow += categoryPower[soulBondCategories[soulBondList[i]]];
            }
        }
        return maxBorrow;
    }

    function calculateTotalBorrowed(address _user) public view returns(uint256){
        uint256 totalBorrowed;
        for(uint i; i< ERC20BorrowTokens.lenght;i++){
            totalBorrowed += ERC20borrowList[ERC20BorrowTokens[i]][msg.sender];
        }
        return totalBorrowed;
    }

     function calculateTotalDeposit(address _user) public view returns(uint256){
        uint256 totalDeposit;
        for(uint i; i< ERC20DepositTokens.lenght;i++){
            totalDeposit += ERC20depositList[ERC20DepositTokens[i]][msg.sender];
        }
        return totalDeposit;
    }
    

    function borrowERC20(address _token, uint256 _value) public {
        updateAllBalances();
        require(calculateTotalBorrowed() + _value < calculateMaxBorrow());
        ERC20BorrowList[_token][msg.sender] += _value;
        IERC20(_token).transfer(msg.sender);

    }

    function payBackERC20() public {

    }



    function addBorrowToken(address _token) public {
        require(msg.sender == owner);
        allowedBorrowedTokens[_token] = true;
    }

    function addDepositToken(address _token) public {
        allowedDepositTokens[_token] = true;
    }


    function editCategories(uint8 _category, uint _power) public {
       require(msg.sender == owner);
       categoryPower[_category] = _power;
    }


    modifier checkBorrowList(address _token){

        require(allowedBorrowedTokens[_token]);
        _;
    }

    modifier checkLendList(address _token){

        require(allowedDepositTokens[_token]);
        _;
    }


}




