import express from "express";
import cors from "cors";
import compilefile from "./compile.js";
import deployfile from "./deploy.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    await compilefile();
    await deployfile();
    res.status(200).json({ message: "Contract deployed successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to deploy the contract" });
  }
});

app.listen(5000, () => {
  console.log("server started");
});
