import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("Data", function () {
  async function deployDataFixture() {
    const [owner] = await ethers.getSigners();

    // Deploy the Data contract with "Hello World" as the initial value
    const dataContract = await hre.ethers.deployContract("Data", [
      "Hello World",
    ]);

    // Wait until the contract is deployed
    await dataContract.waitForDeployment();

    return { dataContract, owner };
  }

  it("should deploy a smart contract", async () => {
    const { dataContract } = await loadFixture(deployDataFixture);

    // Check if the contract address is a valid Ethereum address (it exists on the deployment)
    expect(dataContract.target).to.be.properAddress;
  });

  it("should initialize with the correct data", async () => {
    const { dataContract } = await loadFixture(deployDataFixture);

    // Check if the initial data is set correctly
    const initialData = await dataContract.getData();
    expect(initialData).to.equal("Hello World");
  });

  it("should allow the owner to set new data", async () => {
    const { dataContract } = await loadFixture(deployDataFixture);

    // Set the new data
    await dataContract.setData("New data");

    // Check if the new data is updated correctly
    const newData = await dataContract.getData();
    expect(newData).to.equal("New data");
  });

  it("should return the correct data after it is changed", async () => {
    const { dataContract } = await loadFixture(deployDataFixture);

    // Update the data
    await dataContract.setData("Updated data");

    // Verify that the updated data is correct
    const updatedData = await dataContract.getData();
    expect(updatedData).to.equal("Updated data");
  });
});
