// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

contract Data {
    // Struct to store encrypted data and its hash
    struct Database {
        string encryptedData;  // Encrypted data
        string dataHash;       // Hash of the data
    }

    Database public database;

    // Constructor to initialize the contract with encrypted data and its hash
    constructor(string memory _encryptedData, string memory _dataHash) {
        database = Database({
            encryptedData: _encryptedData,
            dataHash: _dataHash
        });
    }

    // Function to set new encrypted data and its hash
    function setData(string memory _encryptedData, string memory _dataHash) public {
        database.encryptedData = _encryptedData;
        database.dataHash = _dataHash;
    }

    // Function to get the encrypted data
    function getEncryptedData() public view returns (string memory) {
        return database.encryptedData;
    }

    // Function to get the hash of the data
    function getDataHash() public view returns (string memory) {
        return database.dataHash;
    }
}
