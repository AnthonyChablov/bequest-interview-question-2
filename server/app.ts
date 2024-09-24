import express from "express";
import cors from "cors";
import { ethers } from "ethers"; // Import ethers.js

require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
const database = { data: "Hello World" };
/* Smart Contract Info */
const contractAddres = "";
const contractABI = "";

app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json(database);
});

app.post("/", (req, res) => {
  database.data = req.body.data;
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
