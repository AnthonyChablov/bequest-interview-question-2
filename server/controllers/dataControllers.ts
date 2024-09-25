import { Request, Response } from "express";
import { getData, setData } from "../models/contractModel";

const database = { data: "Hello World" }; // In-memory local database

export const getDataHandler = (req: Request, res: Response) => {
  try {
    res.json(database);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: "Failed to fetch data" });
  }
};

export const updateDataHandler = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    if (!data) {
      throw new Error("Invalid data");
    }

    // Update data in local database
    database.data = data;

    // Update data in the blockchain
    await setData(data);

    res.json({ message: "Data updated successfully", data });
  } catch (err) {
    console.error("Error updating data:", err);
    res.status(400).json({ message: err || "Failed to update data" });
  }
};

export const verifyDataHandler = async (req: Request, res: Response) => {
  try {
    const blockchainData = await getData();

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
};
