import express from "express";
import cors from "cors";
import { config } from "dotenv";
import mongoose from "mongoose";
import User from "./models/User.model.js";
import TaskList from "./models/TaskList.model.js";

config({
  path: ".env.local",
});

const app = express();

// eslint-disable-next-line no-undef
const port = process.env.port || 3000;

// eslint-disable-next-line no-undef
mongoose.connect(process.env.DB_URI);

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  return res.send("Fillo server is Running");
});

app.get("/users", async (req, res) => {
  try {
    return res.send(await User.find(req.query));
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).send(err.message);
    } else {
      return res.status(500).send("Something went wrong");
    }
  }
});

app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    return res.status(201).send(result);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).send(err.message);
    } else {
      return res.status(409).send("User already exists");
    }
  }
});

app.post("/tasklists", async (req, res) => {
  try {
    const tasklist = new TaskList(req.body);
    const result = await tasklist.save();
    return res.status(201).send(result);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).send(err.message);
    } else {
      return res.status(409).send("TaskList already exists");
    }
  }
});




app.get("/tasklists", async (req, res) => {
  try {
    return res.send(await TaskList.find(req.query));
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).send(err.message);
    } else {
      return res.status(500).send("Something went wrong");
    }
  }
});

app.put("/tasklists", async (req, res) => {
  try {
    const result = await TaskList.updateOne(
      { user: req.body.user },
      { $set: req.body },
      { upsert: true, setDefaultsOnInsert: true }
    );
    return res.status(200).send(result);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).send(err.message);
    } else {
      return res.status(500).send("Something went wrong");
    }
  }
});

app.post("/tasklists", async (req, res) => {
  try {
    const tasklist = new TaskList(req.body);
    const result = await tasklist.save();
    return res.status(201).send(result);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).send(err.message);
    } else {
      return res.status(409).send("Tasklist already exists");
    }
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
