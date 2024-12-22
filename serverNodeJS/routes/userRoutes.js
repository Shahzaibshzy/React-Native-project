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

module.exports = router;
