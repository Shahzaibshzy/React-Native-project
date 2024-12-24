const User = require("./userSchema");

// Repository functions for user-related database operations
const userRepository = {
  bulkWriteUsers: async (bulkOps) => {
    return await User.bulkWrite(bulkOps);
  },

  findAllUsers: async () => {
    return await User.find();
  },

  findUserById: async (id) => {
    return await User.findOne({ id });
  },

  findLastUser: async () => {
    return await User.findOne().sort({ id: -1 });
  },

  createUser: async (userData) => {
    const user = new User(userData);
    return await user.save();
  },

  updateUserById: async (id, updateData) => {
    const user = await User.findOne({ id });
    if (user) {
      Object.assign(user, updateData);
      return await user.save();
    }
    return null;
  },

  deleteUserById: async (id) => {
    return await User.findOneAndDelete({ id });
  },
};

module.exports = userRepository;
