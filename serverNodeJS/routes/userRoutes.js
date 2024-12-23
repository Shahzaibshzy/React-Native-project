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
    // Fetch the document with the highest `id`
    const lastUser = await User.findOne().sort({ id: -1 }); // Sort in descending order of `id`

    // Determine the next ID
    const newId = lastUser ? lastUser.id + 1 : 1; // If no records exist, start with ID 1

    // Create a new user with the incremented ID
    const user = new User({
      ...req.body,
      id: newId,
    });

    // Save the new user to the database
    await user.save();

    res.status(201).json({
      message: "Player created successfully",
      player: user,
    });
  } catch (error) {
    res.status(400).json({ message: "Error creating player", error });
  }
});

// PUT: Update an existing player
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  // Validate the ID
  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    // Find user by ID
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(404).json({ message: "Player not found" });
    }

    // Update user with new data
    Object.assign(user, req.body);
    await user.save();

    res.status(200).json({ message: "Player updated successfully", player: user });
  } catch (error) {
    console.error("Error updating player:", error);
    res.status(400).json({ message: "Error updating player", error });
  }
});


// DELETE: Remove a player
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const user = await User.findOneAndDelete({ id });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "Player not found" });
    }
    res.status(200).json({ message: "Player deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting player", error });
  }
});

module.exports = router;
