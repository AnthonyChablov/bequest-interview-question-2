require("dotenv").config();

/* Smart Contract Info */

// Contract address for the deployed smart contract.
// This can be set via an environment variable or replaced with the actual address.
const contractAddress = process.env.CONTRACT_ADDRESS || ""; // Replace with actual address of deployed contract

// Ethereum Network to connect to.
const networkEndpoint = "http://127.0.0.1:8545";

// ABI (Application Binary Interface) for the smart contract.
// Defines the functions and data structures of the contract.
const contractABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_encryptedData",
        type: "string",
      },
      {
        internalType: "string",
        name: "_dataHash",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "database",
    outputs: [
      {
        internalType: "string",
        name: "encryptedData",
        type: "string",
      },
      {
        internalType: "string",
        name: "dataHash",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDataHash",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEncryptedData",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_encryptedData",
        type: "string",
      },
      {
        internalType: "string",
        name: "_dataHash",
        type: "string",
      },
    ],
    name: "setData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export { contractABI, contractAddress, networkEndpoint };
