const express = require("express");
const User = require("../models/user");
const router = express.Router();

// Add or Update Users in Bulk
router.post("/bulk", async (req, res) => {
  try {
    const data = req.body; // Assume data is an array of users
    const bulkOps = data.map((user) => ({
      updateOne: {
        filter: { id: user.id },
        update: user,
        upsert: true,
      },
    }));
    await User.bulkWrite(bulkOps);
    res.status(200).json({ message: "Users added/updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error processing bulk users", error });
  }
});

// Get All Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});
// GET: Get a User by ID
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(404).json({ message: "Player not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching player", error });
  }
});

// POST: Add a new User
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({
      message: "Player created successfully",
      player,
    });
  } catch (error) {
    res.status(400).json({ message: "Error creating player", error });
  }
});

// PUT: Update an existing player
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(404).json({ message: "Player not found" });
    }

    Object.assign(user, req.body);
    await user.save();
    res.status(200).json({ message: "Player updated successfully", player });
  } catch (error) {
    res.status(400).json({ message: "Error updating player", error });
  }
});

// DELETE: Remove a player
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const user = await User.findOneAndDelete({ id });
    if (!user) {
      return res.status(404).json({ message: "Player not found" });
    }
    res.status(200).json({ message: "Player deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting player", error });
  }
});

module.exports = router;
