import axios from "axios";
import { API_BASE_URL_DOTNET, API_BASE_URL_NODE } from "@env"; // Import the environment variable

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: API_BASE_URL_NODE, // Use the API base URL from the environment variable
});

// Function to fetch friends
export const fetchFriends = async () => {
  try {
    const response = await api.get("/api/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching friends:", error);
    throw error;
  }
};

/**
 * @param {String | Number} id - The ID of the friend to edit
 * @param {Object} updatedData - The updated friend data
 */
export const editFriend = async (id, updatedData) => {
  console.log("editFriend called with:", { id, updatedData });
  if (!id || (typeof id !== "string" && typeof id !== "number")) {
    throw new Error("Invalid ID provided. ID must be a string or number.");
  }

  try {
    // Send PUT request to update friend
    const response = await api.put(`/api/users/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error editing friend with ID ${id}:`, error);
    throw error;
  }
};


/**
 * Delete a friend
 * @param {string} id - The ID of the friend to delete
 */
export const deleteFriend = async (id) => {
  try {
    const response = await api.delete(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting friend with ID ${id}:`, error);
    throw error;
  }
};

// Export the Axios instance for other requests if needed
export default api;
