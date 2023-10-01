require("@nomiclabs/hardhat-waffle"); // used for smart contract testing https://getwaffle.io/

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
};
