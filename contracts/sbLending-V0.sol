//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract sbLending {
    address[] public soulBondList;
    mapping(address => uint8) public soulBondCategories;
    mapping(uint8 => uint) public categoryPower;

    mapping(address => address) public ERC20Oracles;
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
    mapping(address => uint256) public tokenOraclePrice;
    
    address owner;

    constructor(){
        owner = msg.sender;
    }

    //Deposit a Token as a Collateral
    function depositERC20(address _token, uint256 _value) public {
        require(IERC20(_token).allowance(msg.sender,address(this)) > _value);
        updateAllBalances();
        IERC20(_token).transferFrom(msg.sender, address(this), _value);
        ERC20DepositList[_token][msg.sender] += _value;

    }
    //Withdraw a Token from Collateral
    function withdrawERC20(address _token, uint256 _value) public {
        updateAllBalances();
        require(ERC20DepositList[_token][msg.sender] >= _value);
        ERC20DepositList[_token][msg.sender] -= _value;
        IERC20(_token).transferFrom(msg.sender, address(this), _value);

    }

    //Borrow a Token
    function borrowERC20(address _token, uint256 _value) public {
        require(IERC20(_token).balanceOf(address(this)) > _value);
        updateAllBalances();
        require(calculateTotalBorrowed(msg.sender) + _value < calculateMaxBorrow(msg.sender));
        ERC20BorrowList[_token][msg.sender] += _value;
        IERC20(_token).transfer(msg.sender,_value);

    }
    //Payback a Token
    function payBackERC20(address _token, uint256 _value) public {
        require(IERC20(_token).allowance(msg.sender,address(this)) > _value);
        updateAllBalances();
        require(ERC20BorrowList[_token][msg.sender] >= _value);
        IERC20(_token).transferFrom(msg.sender, address(this), _value);
        ERC20BorrowList[_token][msg.sender] -= _value;
    }



   /** @notice Function to liquidate a non-healthy position collateral-wise, with Health Factor below 1
   * - The caller (liquidator) covers `debtToCover` amount of debt of the user getting liquidated, and receives
   *   a proportionally amount of the `collateralAsset` plus a bonus to cover market risk
   * @param collateralAsset The address of the underlying asset used as collateral, to receive as result of the liquidation
   * @param debtAsset The address of the underlying borrowed asset to be repaid with the liquidation
   * @param user The address of the borrower getting liquidated
   * @param debtToCover The debt amount of borrowed `asset` the liquidator wants to cover
   * receiveAToken True if the liquidators wants to receive the collateral aTokens, `false` if he wants
   * to receive the underlying collateral asset directly
   **/
  function liquidationCall(
    address collateralAsset,
    address debtAsset,
    address user,
    uint256 debtToCover
    // bool receiveAToken
  ) external {
      //Validate Liquidation call (can only go up to 50% ratio)
      updateAllBalances();
      require(calculateTotalBorrowed(user)>calculateMaxBorrow(user));
      require(IERC20(debtAsset).allowance(msg.sender,address(this)) > debtToCover);
      ERC20BorrowList[debtAsset][user] -= debtToCover;
      IERC20(debtAsset).transferFrom(msg.sender, address(this), debtToCover);
      uint totalTransferAmount = debtToCover/tokenOraclePrice[collateralAsset]*105/100; //5% fee
      // or uint totalTransferAmount = debtToCover*tokenOraclePrice[debtAsset]/tokenOraclePrice[collateralAsset]
      ERC20DepositList[collateralAsset][user] -= totalTransferAmount;

      IERC20(collateralAsset).transfer(msg.sender, totalTransferAmount);


  }




    //Add a Fixed interest rate for a Token
    function addTokenInteresFixedInterestRate(address _token, uint256 _interestRate) public {
        tokenFixedInterestRate[_token] = _interestRate;
    }
    //Add a fixed price to a token
    function addTokenInteresFixedPrice(address _token, uint256 _fixedPrice) public {
        tokenOraclePrice[_token] = _fixedPrice;
    }

    //get the fixed interest rate from a token Address
    function getInterestRate(address _token) public view returns(uint256){
        return tokenFixedInterestRate[_token];
    }
    //get a fixed price form a token Address
    function getTokenPrice(address _token) public view returns(uint256){
        return tokenOraclePrice[_token];
    }





    //add a SoulBond Token to the List
    function addSoulBondToken(address _token, uint8 category) external {
        require(msg.sender == owner);
        require(category > 0);
        soulBondList.push(_token);
        soulBondCategories[_token] = category;
    }

  
 
    //update the balance of one individual Token
    function updateBalanceWithInterestRate(address _token) public {
        uint256 lastUpdate = userLastTokenUpdate[msg.sender][_token];
        userLastTokenUpdate[msg.sender][_token] = block.timestamp;
        //calculating interest value to be added
        uint256 value = (block.timestamp - lastUpdate)*tokenFixedInterestRate[_token];
        ERC20DepositList[_token][msg.sender] += value;
    }
    //update the balance of all the tokens;
    function updateAllBalances() public {
        for(uint i; i < ERC20BorrowTokens.length ;i++){
            updateBalanceWithInterestRate(ERC20BorrowTokens[i]);
        }
    }


  
    //Calculate the Max amount an Address can Borrow
    function calculateMaxBorrow(address _user) public view returns(uint256) {
        uint256 maxBorrow = baseMaxBorrow;
        for(uint i; i < soulBondList.length ; i++){
            if(IERC721(soulBondList[i]).balanceOf(_user)>0){
                maxBorrow += categoryPower[soulBondCategories[soulBondList[i]]];
            }
        }
        return maxBorrow/100*calculateTotalDeposit(_user);
    }
    //Calculate the total amount in $ Borrowed by an user
    function calculateTotalBorrowed(address _user) public view returns(uint256){
        uint256 totalBorrowed;
        for(uint i; i< ERC20BorrowTokens.length;i++){
            totalBorrowed += ERC20BorrowList[ERC20BorrowTokens[i]][_user];
        }
        return totalBorrowed;
    }

    //Calculate the total amount in $ Deposited by an user
     function calculateTotalDeposit(address _user) public view returns(uint256){
        uint256 totalDeposit;
        for(uint i; i< ERC20DepositTokens.length;i++){
            totalDeposit += ERC20DepositList[ERC20DepositTokens[i]][_user];
        }
        return totalDeposit;
    }
    


    //Add a token to be borrowed(should check if token can already be deposited)
    function addBorrowToken(address _token) public {
        require(msg.sender == owner);
        allowedBorrowedTokens[_token] = true;
    }
    //Add a token to be deposited
    function addDepositToken(address _token) public {
        allowedDepositTokens[_token] = true;
    }

    //edit the power of each SoulBond Token
    function editCategories(uint8 _category, uint _power) public {
       require(msg.sender == owner);
       categoryPower[_category] = _power;
    }

    function addOracle(address _token, address _oracle) public {
        ERC20Oracles[_token] = _oracle;
    }

    function getLatestPrice(address _token) public view returns(int price) {
        (
            /*uint80 roundID*/,
            price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = AggregatorV3Interface(ERC20Oracles[_token]).latestRoundData();
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




