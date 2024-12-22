import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import styles from "./Style";


const FriendListScreen = () => {
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
