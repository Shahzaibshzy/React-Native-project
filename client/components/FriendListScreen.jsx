import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Button,
} from "react-native";

import styles from "./Style";
import api, { fetchFriends, editFriend, deleteFriend } from "../api/api";

const FriendListScreen = () => {
  const [friends, setFriends] = useState([]); // State to store fetched friends
  const [loading, setLoading] = useState(true); // State to manage loading
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    age: "",
    rating: 0,
    sports: [],
    imageUrl: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openModal = (friend = null) => {
    if (friend) {
      setFormData(friend); // Pre-fill form with friend's data for editing
      setEditMode(true);
      setSelectedFriendId(friend.id);
    } else {
      setFormData({
        name: "",
        country: "",
        age: "",
        rating: 0,
        sports: [],
        imageUrl: "",
      });
      setEditMode(false);
      setSelectedFriendId(null);
    }
    setIsModalVisible(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { id, ...updatedData } = formData;
    console.log("Submitting form data:", formData);

    try {
      if (editMode) {
        if (!id) {
          console.error("ID is missing");
          return;
        }
        // Edit friend
        const updatedFriend = await editFriend(id, updatedData);
        console.log("Friend updated successfully:", updatedFriend);
      } else {
        // Add new friend
        await api.post("/api/users", formData);
      }
      closeModal();
      // Refresh the friends list (add logic to re-fetch data here)
    } catch (error) {
      console.error("Error saving friend:", error);
    }
  };

  // Handle delete
  const handleDelete = async (friendId) => {
    try {
      await deleteFriend(friendId);
      console.log("Friend deleted successfully");
      // Refresh the friends list (add logic to re-fetch data here)
    } catch (error) {
      console.error("Error deleting friend:", error);
    }
  };

  useEffect(() => {
    const loadFriends = async () => {
      try {
        const data = await fetchFriends(); // Fetch friends using the API function
        setFriends(data);
      } catch (error) {
        console.error("Error loading friends:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFriends();
  }, []);

  const renderFriend = ({ item }) => {
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.details}>
            {item.country} - {item.age}
          </Text>
          <View style={styles.ratingContainer}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Text key={index} style={styles.star}>
                {index < Math.floor(item.rating) ? "★" : "☆"}
              </Text>
            ))}
          </View>
          <Text style={styles.sports}>{item.sports.join(" | ")}</Text>
        </View>
        <View style={styles.buttoncCard}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => openModal(item)}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => handleDelete(item.id)}
          >
            <Text style={styles.buttonText2}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Add Button */}
      <TouchableOpacity style={styles.topButton} onPress={() => openModal()}>
        <Text style={styles.topButtonText}>Add Friend</Text>
      </TouchableOpacity>

      {/* Friends List */}
      <FlatList
        data={friends}
        renderItem={renderFriend}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />

      {/* Modal for Add/Edit */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editMode ? "Edit Friend" : "Add Friend"}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Country"
              value={formData.country}
              onChangeText={(text) =>
                setFormData({ ...formData, country: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Age"
              value={formData.age}
              onChangeText={(text) => setFormData({ ...formData, age: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Rating"
              value={formData.rating}
              onChangeText={(text) =>
                setFormData({ ...formData, rating: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Sports (e.g., Football, Basketball, Tennis)"
              value={formData.sports.join(", ")} // Convert array to comma-separated string
              onChangeText={(text) => {
                const sportsArray = text
                  .split(",")
                  .map((sport) => sport.trim()); // Split by commas and trim spaces
                setFormData({ ...formData, sports: sportsArray });
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Image URL"
              value={formData.imageUrl}
              onChangeText={(text) =>
                setFormData({ ...formData, imageUrl: text })
              }
            />
            <Button title="Save" onPress={handleSubmit} />
            <Button title="Cancel" color="red" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default FriendListScreen;
