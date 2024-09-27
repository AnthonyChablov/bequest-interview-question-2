import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("Data", function () {
  // Fixture to deploy the Data contract with initial values
  async function deployDataFixture() {
    const [owner] = await ethers.getSigners();

    // Deploy the Data contract with initial encrypted data and hash
    const dataContract = await hre.ethers.deployContract("Data", [
      "encryptedHelloWorld", // Example of encrypted data
      "hashHelloWorld", // Example of the hash of the data
    ]);

    // Wait until the contract is deployed
    await dataContract.waitForDeployment();

    return { dataContract, owner };
  }

  it("should deploy a smart contract", async () => {
    const { dataContract } = await loadFixture(deployDataFixture);

    // Check if the contract address is valid (deployed on the network)
    expect(dataContract.target).to.be.properAddress;
  });

  it("should initialize with the correct encrypted data and hash", async () => {
    const { dataContract } = await loadFixture(deployDataFixture);

    // Check if the initial encrypted data is correct
    const initialEncryptedData = await dataContract.getEncryptedData();
    expect(initialEncryptedData).to.equal("encryptedHelloWorld");

    // Check if the initial hash is correct
    const initialDataHash = await dataContract.getDataHash();
    expect(initialDataHash).to.equal("hashHelloWorld");
  });

  it("should allow setting new encrypted data and its hash", async () => {
    const { dataContract } = await loadFixture(deployDataFixture);

    // Set the new encrypted data and its hash
    await dataContract.setData("newEncryptedData", "newDataHash");

    // Check if the new encrypted data is updated correctly
    const newEncryptedData = await dataContract.getEncryptedData();
    expect(newEncryptedData).to.equal("newEncryptedData");

    // Check if the new hash is updated correctly
    const newDataHash = await dataContract.getDataHash();
    expect(newDataHash).to.equal("newDataHash");
  });

  it("should correctly retrieve the updated data and hash after changing", async () => {
    const { dataContract } = await loadFixture(deployDataFixture);

    // Update the encrypted data and hash
    await dataContract.setData("updatedEncryptedData", "updatedDataHash");

    // Verify that the updated encrypted data is correct
    const updatedEncryptedData = await dataContract.getEncryptedData();
    expect(updatedEncryptedData).to.equal("updatedEncryptedData");

    // Verify that the updated hash is correct
    const updatedDataHash = await dataContract.getDataHash();
    expect(updatedDataHash).to.equal("updatedDataHash");
  });
});
