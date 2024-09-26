import express from "express";
import cors from "cors";
import { ethers, Contract, JsonRpcSigner, JsonRpcProvider } from "ethers";
import crypto from "crypto-js";
import { contractABI, contractAddress } from "./config/contractInfo";

require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
let database = { data: "Hello World", hash: "" }; // Store both data and hash

app.use(cors());
app.use(express.json());

// Module-level variables to store provider, signer, and contract
let provider: JsonRpcProvider;
let signer: JsonRpcSigner;
let contract: Contract;

// Connect to Hardhat local network
const initialize = async () => {
  provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
  signer = await provider.getSigner(); // By default, Hardhat provides unlocked accounts
  contract = new ethers.Contract(contractAddress, contractABI, signer);
};

// Initialize once when the module is loaded
initialize();

// Routes

/* Fetch Data */
app.get("/", (req, res) => {
  try {
    res.json({
      data: database.data,
      hash: database.hash, // Send both the data and the hash
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: "Failed to fetch data" });
  }
});

/* Updates Data */
app.post("/", async (req, res) => {
  try {
    const { data } = req.body;
    if (!data) {
      throw new Error("Invalid data");
    }

    // Update data in local database
    database.data = data;

    // Hash the data and store it in the local database
    const hashedData = crypto.SHA256(data).toString(crypto.enc.Hex);
    database.hash = hashedData;

    // Update data in the blockchain
    const tx = await contract.setData(data);
    await tx.wait();

    res.json({ message: "Data updated successfully", data, hash: hashedData });
  } catch (err) {
    console.error("Error updating data:", err);
    res.status(400).json({ message: err || "Failed to update data" });
  }
});

/* Verify Data */
app.post("/verify", async (req, res) => {
  try {
    // Get data from the blockchain
    const blockchainData = await contract.getData();

    // Hash the blockchain data
    const blockchainDataHash = crypto
      .SHA256(blockchainData)
      .toString(crypto.enc.Hex);

    // Compare blockchain hash with stored hash
    if (blockchainDataHash === database.hash) {
      return res
        .status(200)
        .json({ message: "Verification successful: Hashes match" });
    } else {
      return res
        .status(400)
        .json({ message: "Verification failed: Hashes do not match" });
    }
  } catch (err) {
    console.error("Error verifying data:", err);
    res.status(500).json({ message: "Verification failed" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
