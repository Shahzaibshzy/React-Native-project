import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";

import styles from "./Style";
import { fetchFriends } from "../api/api";

const FriendListScreen = () => {
  const [friends, setFriends] = useState([]); // State to store fetched friends
  const [loading, setLoading] = useState(true); // State to manage loading

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
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Unfriend</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <FlatList
      data={friends}
      renderItem={renderFriend}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
};
export default FriendListScreen;
