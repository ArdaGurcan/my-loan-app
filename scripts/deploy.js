// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const Loan = await ethers.getContractFactory("Loan");
  const loan = await Loan.deploy(
    // These are the constructor parameters
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", // _borrower address
    ethers.utils.parseEther("1.0"), // _principal (1.0 ether for example)
    500, // _interestRate (5.00%)
    365*5, // _durationInDays (5 years for example)
    ethers.utils.parseEther("0.5") // _collateral (0.5) ether for example)
  );

  console.log("Loan address:", loan.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
