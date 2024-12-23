const express = require("express");
const router = express.Router();
const userController = require("./userController");

router.post("/bulk", userController.bulkUploadUsers);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.addUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
