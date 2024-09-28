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

**Background Info**
In this application, the Ethereum blockchain is being run in a simulated test environemnt simulating that of the actual Ethereum mainnet. To perform this simulation the development tool Hardhat is being used. Hardhat is a suite of tools and development environment that allows us to build, test and deploy our Smart-Contracts and decentralized applications. In the case of a real deployment to either a Test-net like Sepolia or the actual Ethereum Main-net, we would need to make sure the the vital user data is not being exposed to malicious actors.As the Ethereum blockchain is a decentralized public platform with capabilities of a distributed state machine, anyone can simply look at our Smart-Contract bytecode, decompile it and then take this vital user data stored in our Smart-Contract, which can have important user information on it. To ensure this is not the case, I made sure to encrypt the data being sent to the Smart-Contract via a secret key. Everytime we request data from the Smart-Contract, we will decrypt it using our secret key that will not be revealed to anyone. Deployment to a Ethereum Test-net or Main-net would follow the same process as that of our local development environment. However we would need a connected Wallet (Metamask etc..) and some Ether/Test Ether to facilitate the deployment of our Smart-Contract (pay required Transaction / Gas fees). We would begin by compiling our Smart-Contract Bytecode which will give us the Application Binary Interface (ABI) as well as our Smart-Contract Bytecode. The Application Binary Interface (ABI) serves as a strandardized way to interact with our Smart Contract as well as our Contract Bytecode. Our Contract Bytecode is the compiled version of our Smart Contract's code that is in a machine-readable format to be executed by the Ethereum Virtual Machine (EVM). So with our ABI and Bytecode handy we would then need to use the Ethers.js (a library that facilitates interactions with the Ethereum blockchain) and our wallet funded with Ether/Test-Ether to deploy our smart contract to the Ethereum blockchain. In this case we would need an Ethereum Node to deploy our Smart Contract to, we could set up our own Ethereum Node or use a third-party service like Infura to deploy our contract to. Infura has a variety of nodes available in a variety of different Ethereum networks (Main-Net, Test-Nets like Sepolia etc...) , we would just need to signup on their platform and use the API key provided to us. So when we successfully deploy our Smart Contract to the Ethereum Node (via Infura or our own Node) using Ethers.js with our connected Wallet that has enough Ether to process the transaction by paying the relevant gas-fees/transaction fees, we will recieve our deployed address of our smart contract by which we will use in conjucntion with out ABI to interact with it. Our Node.js / Express.js application will interact with our deployed contract using this ABI and address.

So in terms of Hardhat, the latest version of Hardhat has a bunch of modules in a new system called Ignition that allow us to deploy and compile our smart contract. In the past we would have to write our own deploy and compile scripts. Ignition makes it much easier to write and deploy smart contracts and interact with the Ethereum network.

More Info can be found here:
https://hardhat.org/ignition/docs/getting-started#overview

**1. How does the client ensure that their data has not been tampered with?**
<br />
To ensure that the data has not been tampered with, a variety of tools and techniques have been utilized to guarantee integrity and security throughout the data life cycle. I utilized the Ethereum blockchain as well as cryptographic hashing, and encryption. The reason why I believe blockchain to be a suitable tool for this problem is because it is an immutable ledger by which we can store records in a way that is transparent that is resistant to tampering.  
<br />
In terms of the flow of this application, a user can ensure that their data has not been tampered with by clicking on the verify data button, this button triggers a response that hits the '/verify' endpoint of the api backend. In this api endpoint, the logic surrounding the verification process can be found. This verification process comprises of comparing the data from the database to that of the data stored in the Smart-Contract of the Ethereum blockchain.

<br />
In our smart contract we a mapping that has two variables that include the data hash and the encrypted data.

<br />
**2. If the data has been tampered with, how can the client recover the lost data?**

Edit this repo to answer these two questions using any technologies you'd like, there any many possible solutions. Feel free to add comments.

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
```

## To make a submission:

1. Clone the repo
2. Make a PR with your changes in your repo
3. Email your github repository to robert@bequest.finance

```

```

```

```
