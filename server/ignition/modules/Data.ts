// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DEFAULT_DATA = "Hello World";
const DEFAULT_VALUE = "NewData"; // Example default value for the second constructor parameter

const DataModule = buildModule("DataModule", (m) => {
  // Get the initial data for the contract from the parameters or use the default value
  const initialData = m.getParameter("initialData", DEFAULT_DATA);
  const initialValue = m.getParameter("initialValue", DEFAULT_VALUE); // Get the second parameter

  // Deploy the `Data` contract with both initial data and value as constructor arguments
  const dataContract = m.contract("Data", [initialData, initialValue]);

  return { dataContract };
});

export default DataModule;
