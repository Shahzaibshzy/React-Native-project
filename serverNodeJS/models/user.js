const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  country: { type: String, required: true },
  age: { type: String, required: true },
  rating: { type: Number, required: true },
  sports: { type: [String], required: true },
  imageUrl: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
