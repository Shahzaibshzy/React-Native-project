import axios from "axios";
import { API_BASE_URL } from "@env";  // Import the environment variable

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: "http://localhost:5266" || "http://localhost:5000",  // Fallback to localhost if the env variable is not set
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

// Export the Axios instance for other requests if needed
export default api;
