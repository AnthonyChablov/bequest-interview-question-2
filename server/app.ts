import express from "express";
import cors from "cors";
import { ethers, Contract, JsonRpcSigner, JsonRpcProvider } from "ethers";
import { contractABI, contractAddress } from "./contractInfo";

require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
const database = { data: "Hello World" };

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

// Instantiate Contract Object
// Routes
app.get("/", (req, res) => {
  try {
    res.json(database);
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

    // Update data in the blockchain
    const tx = await contract.setData(data);
    await tx.wait();

    res.json({ message: "Data updated successfully", data });
  } catch (err) {
    console.error("Error updating data:", err);
    res.status(400).json({ message: err || "Failed to update data" });
  }
});

/* Verify Data */
// If no match return error, if match return success else error -- display states in front end
app.post("/verify", async (req, res) => {
  try {
    // Get data from the block chain
    const blockchainData = await contract.getData();

    if (blockchainData === database.data) {
      return res
        .status(200)
        .json({ message: "Verification successful: Data Matches" });
    } else {
      return res
        .status(400)
        .json({ message: "Verification failed: Data does not match" });
    }
  } catch (err) {
    console.error("Error verifying data:", err);
    res.status(500).json({ message: "Verification failed" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
