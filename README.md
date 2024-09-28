# Tamper Proof Data

At Bequest, we require that important user data is tamper proof. Otherwise, our system can incorrectly distribute assets if our internal server or database is breached.

# Tools Used:

- React.js (Frontend)
- Express.js/Node.js (API + Backend)
- TypeScript
- Ethereum
- Solidity
- Hardhat (Development Tool for deploying, building and deploying Smart Contracts to Ethereum Network)
- Ethers.js (A JavaScript library that facilitates interactions with the Ethereum blockchain, manages Private Keys and sends transactions etc.)

# Background Info

In this application, the Ethereum blockchain is being run in a simulated test environment simulating that of the actual Ethereum mainnet.
To perform this simulation the development tool **Hardhat** is being used. **Hardhat**, a suite of development tools that allow us to build, test, and deploy Smart Contracts and decentralized applications (dApps). For real-world deployment on a Test-net (e.g., Sepolia) or the Ethereum mainnet, protecting vital user data is crucial to avoid exposure to malicious actors.

### Security Considerations

**Ethereum** is a decentralized public platform, which means that anyone can inspect Smart Contract **bytecode**, decompile it, and access sensitive information stored in the contract. In the case of a real deployment to either a Test-net like **Sepolia** or the actual **Ethereum Main-net**, we would need to make sure the the vital user data is not being exposed to malicious actors. To counter this, all data sent to the Smart Contract is encrypted using a secret key. When data is retrieved from the Smart Contract, it is decrypted using the same key, which is never revealed publicly.

### Deployment Process

The deployment process to an Ethereum Test-net or Main-net follows the same steps as in our local development environment. However, it requires a connected wallet (e.g., **MetaMask**) and sufficient **Ether/Test Ether** to cover transaction and gas fees. Below is a general overview of the deployment steps:

1. **Compile Smart Contracts**:

   - Hardhat compiles the Smart Contract into **bytecode** and generates the **Application Binary Interface (ABI)**.
   - The **ABI** is a standardized way to interact with the Smart Contract.
   - The **bytecode** is a machine-readable version of the Smart Contract code, executed by the Ethereum Virtual Machine (EVM).

2. **Deploy the Contract**:
   - We Use **Ethers.js**, a library to interact with the Ethereum blockchain.
   - Fund the connected wallet with Ether/Test Ether to pay gas/transaction fees.
   - Deploy the Smart Contract using an Ethereum Node. You can either:
     - Set up your own Ethereum Node, or
     - Use a third-party service like **Infura**, which provides access to Ethereum Main-net and various Test-nets (like Sepolia).
3. **Post-Deployment**:
   - Upon successful deployment, you’ll receive the deployed address of the Smart Contract.
   - Use this address and the ABI to interact with the contract in your Node.js / Express.js application.

### Hardhat and Ignition

The latest version of Hardhat introduces a new module system called **Ignition**. Ignition simplifies Smart Contract compilation and deployment, removing the need to manually write deploy and compile scripts. This tool provides a streamlined and an overall easier way to interact with the Ethereum network.

For more information on Ignition, visit the [official Hardhat documentation](https://hardhat.org/ignition/docs/getting-started#overview).

# 1. How does the client ensure that their data has not been tampered with?

<br />
To ensure that the data has not been tampered with, a variety of tools and techniques have been utilized to guarantee integrity and security throughout the data life cycle. I utilized the Ethereum blockchain as well as cryptographic hashing, and encryption. The reason why I believe blockchain to be a suitable tool for this problem is because it is an immutable ledger by which we can store records in a way that is transparent that is resistant to tampering.  
<br />
In terms of the flow of this application, a user can ensure that their data has not been tampered with by clicking on the verify data button, this button triggers a response that hits the '/verify' endpoint of our api backend. In this api endpoint, the logic surrounding the verification process can be found. This verification process comprises of comparing the data hash that we have persisted in our off-chain centralized database to that of the data hash stored in the Smart-Contract of the Ethereum blockchain. If the hashes match, the user will receive a success message which indicates that their data is intact and has not been tampered with. Alternatively, if the data hashes do not match, an error message is returned, clearly indicating potential tampering. This straightforward verification mechanism ensures users can trust the integrity of their data.

Below is the implementation of the verify process:

```javascript
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
```

# 2. If the data has been tampered with, how can the client recover the lost data?

If the data hash from the off-chain database does not match the data hash stored on the blockchain, users can recover their data at any time by invoking the recovery endpoint by clicking the 'recover data' button. In this implementation the data is fetched from the smart contract and then decrypted and returned to the user. Below is the implementation of the recovery process:

````javascript
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
});```

### To run the app:

`npm install` in both the frontend and backend
`npm run start` in both the frontend and backend via two different terminals
`npm run start:hardhat` to run our local test network in a separate terminal
`npm compile:contract` to compile the Solidity smart contract using the Hardhat compile script
`npm run deploy:local` to deploy our compiled smart contract to our local test Ethereum network
When successfully deployed we need to save the address of where our contract is deplyed to.
In our Express.js applcation we need to change our contract address in this var:

```javascript
const contractAddress = process.env.CONTRACT_ADDRESS || ""; // Replace with actual address of deployed contract
````

## To make a submission:

1. Clone the repo
2. Make a PR with your changes in your repo
3. Email your github repository to robert@bequest.finance
