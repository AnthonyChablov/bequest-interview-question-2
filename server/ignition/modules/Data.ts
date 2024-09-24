// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DEFAULT_DATA = "Hello World";

const DataModule = buildModule("DataModule", (m) => {
  // Get the initial data for the contract from the parameters or use the default value
  const initialData = m.getParameter("initialData", DEFAULT_DATA);
  // Deploy the `Data` contract with the initial data as a constructor argument
  const dataContract = m.contract("Data", [initialData]);

  return { dataContract };
});

export default DataModule;
