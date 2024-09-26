// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

contract Data {
    struct Database {
        string data;
        string hash; // Store both the original data and its hash
    }

    Database public database;

    // Constructor to initialize the database with default values
    constructor(string memory _data, string memory _hash) {
        database = Database({ data: _data, hash: _hash});
    }

    // Function to set new data and its hash in the database
    function setData(string memory _data, string memory _hash) public {
        database.data = _data;
        database.hash = _hash;
        
    }

    // Function to get the current data
    function getData() public view returns (string memory) {
        return database.data;
    }

    // Function to get the current hash
    function getHash() public view returns (string memory) {
        return database.hash;
    }
}
