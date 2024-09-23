// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;
import "hardhat/console.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Data {

    // Define a struct to store the data
    struct Database {
        string data;
    }

    Database public database;

    // Constructor to initialize the database with a default value
    constructor(string memory _data) payable {
        database = Database({ data: _data });
    }

    // Function to set new data in the database
    function setData(string memory _data) public {
        database.data = _data;
    }

    // Function to get the current data from the database
    function getData() public view returns (string memory) {
        return database.data;
    }
}
