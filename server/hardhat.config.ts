import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      chainId: 5000,
    },
  },
  solidity: "0.8.27",
};

export default config;
