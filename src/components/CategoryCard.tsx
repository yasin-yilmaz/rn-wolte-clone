import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Colors } from "@/constants/theme";

import { categories } from "@/data/categories";

type Props = {
  item: (typeof categories)[0];
};

const CategoryCard = ({ item }: Props) => {
  return (
    <TouchableOpacity style={styles.categoryCard}>
      <View
        style={[
          styles.categoryImageContainer,
          { backgroundColor: item.backgroundColor },
        ]}
      >
        <Image source={item.image} style={styles.categoryImage} />
      </View>
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryPlaces}>{item.placesCount} places</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  categoryCard: {
    width: 130,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginVertical: 8,
    boxShadow: "0px 4px 2px -2px rgba(0, 0, 0, 0.2)",
    elevation: 2,
  },
  categoryImageContainer: {
    padding: 12,
  },
  categoryImage: {
    width: 106,
    height: 106,
    borderRadius: 8,
  },
  categoryInfo: {
    backgroundColor: "#fff",
    padding: 12,
    paddingTop: 4,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors["light"],
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  categoryPlaces: {
    fontSize: 12,
    color: "#666",
  },
});
