const userService = require("../service/userService");

const userController = {
  bulkUploadUsers: async (req, res) => {
    try {
      const users = req.body;
      const result = await userService.bulkUploadUsers(users);
      res.status(200).json({ message: "Users added/updated successfully", result });
    } catch (error) {
      res.status(500).json({ message: "Error processing bulk users", error });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
  },

  getUserById: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await userService.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error });
    }
  },

  addUser: async (req, res) => {
    try {
      const user = await userService.addUser(req.body);
      res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
      res.status(400).json({ message: "Error creating user", error });
    }
  },

  updateUser: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updatedUser = await userService.updateUser(id, req.body);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      res.status(400).json({ message: "Error updating user", error });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deletedUser = await userService.deleteUser(id);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user", error });
    }
  },
};

module.exports = userController;
