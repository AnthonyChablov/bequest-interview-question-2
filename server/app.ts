import express from "express";
import cors from "cors";
import { initialize } from "./models/contractModel"; // Import the initialize function
import dataRoutes from "./routes/dataRoutes";

require("dotenv").config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// Initialize the Ethereum provider and contract
initialize();

app.use("/api", dataRoutes); // Use the data routes under /api/data

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
