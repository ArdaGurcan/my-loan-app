// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
contract Loan {

    address payable private lender;
    address payable private borrower;
    uint256 private principal;
    uint256 private interestRate; // in basis points, i.e., interestRate of 500 means 5%
    uint256 private durationInDays;
    uint256 private balance; // balance includes principal + interest
    uint256 private repayBy;
    bool private loaned;
    bool private depositedCollateral;
    bool private finished;
    uint256 private collateral;
    uint256 private collateralBalance;

    constructor(
        address payable _borrower, 
        uint256 _principal, 
        uint256 _interestRate, 
        uint256 _durationInDays,
        uint256 _collateral
    ) {
        lender = payable(msg.sender);
        borrower = _borrower;
        principal = _principal;
        interestRate = _interestRate;
        durationInDays = _durationInDays;
        repayBy = block.timestamp + (_durationInDays * 1 days);
        loaned = false;
        depositedCollateral = false;
        finished = false;
        collateral = _collateral;
        collateralBalance = 0;
    }

    function getLender() public view returns (address) {
        return lender;
    }

    function getBorrower() public view returns (address) {
        return borrower;
    }

    function getInfo() public view returns (uint256, uint256, uint256, uint256, uint256, uint256 ) {
        return (principal, balance, interestRate, repayBy, collateral, collateralBalance);
    }

    function calculateInterest() public view returns (uint256) {
        uint256 timeInYears = durationInDays / 365;
        uint256 interest = (principal * interestRate * timeInYears) / 10000; // Divide by 10000 to adjust for basis points
        return interest;
    }
    event LogLoan(string message, uint256 value);

    function loan() public payable {
        emit LogLoan("loan 1", 1);

        console.log("loan 1");
        require(msg.sender == lender, "Only the lender can loan the amount");
        console.log("loan 2");
        require(depositedCollateral || collateral == 0, "Collateral not paid yet");
        console.log("loan 3");
        require(!loaned, "Loan already disbursed");
        console.log("loan 4");

        uint256 interest = calculateInterest();
        balance = principal + interest;
        
        require(msg.value == principal, "Incorrect loan amount");
        console.log("loan 5");
        
        (bool sent, ) = borrower.call{value: principal}("");
        require(sent, "Failed to send Ether");
        
        loaned = true;
        console.log("balance: ", balance);
    }

    function repay() public payable {
        require(msg.sender == borrower, "Only the borrower can repay the loan");
        require(loaned, "Loan not yet disbursed");
        require(msg.value <= balance, "Overpayment not allowed");
        
        balance -= msg.value;

        if (balance == 0) {
            (bool sent, ) = borrower.call{value: collateralBalance}("");
            require(sent, "Failed to send Ether");
        }
    }

    function depositCollateral() public payable {
        require(msg.sender == borrower, "Only the borrower can deposit the collateral");
        require(!depositedCollateral, "Collateral already deposited");
        require(msg.value <= collateral - collateralBalance, "Overpayment of collateral is not allowed");
        require(!hasDefaulted(), "The loan has defaulted");

        collateralBalance += msg.value;
        if (collateralBalance == collateral) {
            depositedCollateral = true;
        }
    }

    function liquidate() public {
        require(msg.sender == lender, "Only the lender can liquidate the balance");
        require(hasDefaulted() || isRepaid(), "Loan hasn't been repaid or defaulted yet");

        if (hasDefaulted()) {
            require(collateralBalance + (principal + calculateInterest() - balance) > 0, "No ETH to send");
            (bool sent, ) = lender.call{value: collateralBalance + (principal + calculateInterest() - balance)}("");
            require(sent, "Failed to send Ether");
        } else {
            require(principal + calculateInterest() > 0, "No ETH to send");
            // require(isRepaid(), "Loan hasn't been repaid yet");
            (bool sent, ) = lender.call{value: principal + calculateInterest()}("");
            require(sent, "Failed to send Ether");
        }
        finished = true;
    }
    
    function isFinished() public view returns (uint) {
        return finished ? 1 : 0;
    }
    function isRepaid() public view returns (bool) {
        return balance == 0;
    }

    function hasDefaulted() public view returns (bool) {
        return balance > 0 && block.timestamp > repayBy;
    }
}
