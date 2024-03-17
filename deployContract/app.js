import express from "express";
import cors from "cors";
import compilefile from "./compile.js";
import deployfile from "./deploy.js";
const app = express();

app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const { code } = req.body; // Extract Solidity code from request body
    if (!code) {
      return res.status(400).json({ message: "Solidity code is required" });
    }
    // Pass the Solidity code for compilation and deployment
    await compilefile(code);
    await deployfile(code);
    res.status(200).json({ message: "Contract deployed successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to deploy the contract" });
  }
});

app.listen(5000, () => {
  console.log("server started");
});
