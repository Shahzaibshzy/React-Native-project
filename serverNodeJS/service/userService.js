const userRepository = require("../models/user");

const userService = {
  bulkUploadUsers: async (users) => {
    const bulkOps = users.map((user) => ({
      updateOne: {
        filter: { id: user.id },
        update: user,
        upsert: true,
      },
    }));
    return await userRepository.bulkWriteUsers(bulkOps);
  },

  getAllUsers: async () => {
    return await userRepository.findAllUsers();
  },

  getUserById: async (id) => {
    return await userRepository.findUserById(id);
  },

  addUser: async (userData) => {
    const lastUser = await userRepository.findLastUser();
    const newId = lastUser ? lastUser.id + 1 : 1;
    const user = { ...userData, id: newId };
    return await userRepository.createUser(user);
  },

  updateUser: async (id, updateData) => {
    return await userRepository.updateUserById(id, updateData);
  },

  deleteUser: async (id) => {
    return await userRepository.deleteUserById(id);
  },
};

module.exports = userService;
