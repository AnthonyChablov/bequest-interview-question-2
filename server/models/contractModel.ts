import { ethers, Contract, JsonRpcSigner, JsonRpcProvider } from "ethers";
import {
  contractABI,
  networkEndpoint,
  contractAddress,
} from "../config/contractInfo";

let provider: JsonRpcProvider;
let signer: JsonRpcSigner;
let contract: Contract;

// Connect to Hardhat local network
export const initialize = async () => {
  try {
    provider = new ethers.JsonRpcProvider(networkEndpoint); // Ethereum network endpoint
    signer = await provider.getSigner(); // Get signer from provider
    contract = new ethers.Contract(contractAddress, contractABI, signer);
    console.log("Ethereum provider and contract initialized successfully.");
  } catch (err) {
    console.error(
      "Error initializing Ethereum provider or contract, Please deploy hardhat local network or connect to a network:",
      err
    );
  }
};

// Expose contract functions for use in controllers
export const setData = async (data: string) => {
  const tx = await contract.setData(data);
  await tx.wait();
};

export const getData = async () => {
  return await contract.getData();
};
