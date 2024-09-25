import express from "express";
import cors from "cors";

require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
const database = { data: "Hello World" };

app.use(cors());
app.use(express.json());

// Routes

app.get("/", (req, res) => {
  try {
    res.json(database);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: "Failed to fetch data" });
  }
});

/* Updates Data */
app.post("/", async (req, res) => {
  try {
    const { data } = req.body;
    if (!data) {
      throw new Error("Invalid data");
    }
    database.data = data;
    res.json({ message: "Data updated successfully", data });
  } catch (err) {
    console.error("Error updating data:", err);
    res.status(400).json({ message: err || "Failed to update data" });
  }
});

app.post("/verify", async (req, res) => {});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
