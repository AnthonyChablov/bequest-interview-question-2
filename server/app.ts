import express from "express";
import cors from "cors";
import { ethers, Contract, JsonRpcSigner, JsonRpcProvider } from "ethers";
import crypto from "crypto-js";
import { contractABI, contractAddress } from "./config/contractInfo";
import { decryptData, encryptData } from "./utils/utils";

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
  signer = await provider.getSigner();
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
      hash: database.hash, // Return the hash as well for verification
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

    // Hash the data and store the hash locally
    const hashedData = crypto.SHA256(data).toString(crypto.enc.Hex);
    const encryptedData = encryptData(data); // Encrypt the data
    database.data = data; // Store original data in your local database (if needed)
    database.hash = hashedData; // Store hashed data in your local database

    // Send the hashed data to the blockchain (instead of the raw data)
    const tx = await contract.setData(encryptedData, hashedData); // Send the encrypted data to blockchain
    await tx.wait();

    res.json({
      message: "Data updated successfully",
      data: data, // Send original data back to the client
      hash: hashedData, // Send the hash for reference
    });
  } catch (err) {
    console.error("Error updating data:", err);
    res.status(400).json({ message: err || "Failed to update data" });
  }
});

/* Verify Data */
app.post("/verify", async (req, res) => {
  try {
    // Get data from the blockchain
    const blockchainDataHash = await contract.getDataHash();

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

/* Recover Data from Blockchain */
app.post("/recover", async (req, res) => {
  try {
    // Fetch the encrypted data from the blockchain
    const blockchainData = await contract.getEncryptedData();

    // Decrypt the blockchain data
    const decryptedData = decryptData(blockchainData);

    // Hash the decrypted data
    const blockchainDataHash = crypto
      .SHA256(decryptedData)
      .toString(crypto.enc.Hex);

    // Recover and update local database with blockchain data and hash
    database.data = decryptedData;
    database.hash = blockchainDataHash;

    res.json({
      message: "Data successfully recovered from blockchain",
      data: decryptedData,
      hash: blockchainDataHash,
    });
  } catch (err) {
    console.error("Error recovering data:", err);
    res.status(500).json({ message: "Failed to recover data" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
