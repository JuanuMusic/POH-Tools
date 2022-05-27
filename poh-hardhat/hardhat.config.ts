import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

//  Use this if deploying to KILN
const {
  GanacheGasMultiplierProvider,
} = require("hardhat/internal/core/providers/gas-providers");

GanacheGasMultiplierProvider.prototype._isGanache = async () => false;


const config: HardhatUserConfig & { gasReporter: any, etherscan: any, settings: any } = {
  solidity: "0.8.4",
  settings: {
    optimizer: {
      enabled: true,
      runs: 400,
    },
  },
  networks: {
    kiln: {
      url: process.env.KILN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: false,
    currency: "USD",
    gasPrice: 30
  },
  mocha: {
    timeout: 1200000
  },
  etherscan: {

  }
};

export default config;
