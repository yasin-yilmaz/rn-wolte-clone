import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors } from "@/constants/theme";

import { categories } from "@/data/categories";

import CategoryCard from "./CategoryCard";

const CategoryLIst = () => {
  return (
    <View style={styles.categoriesSection}>
      <View style={styles.categoriesHeader}>
        <Text style={styles.categoriesTitle}>Categories</Text>
        <TouchableOpacity style={styles.seeAllBtn}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CategoryCard item={item} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
      />
    </View>
  );
};

export default CategoryLIst;

const styles = StyleSheet.create({
  categoriesSection: {
    marginBottom: 24,
  },
  categoriesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: "6",
  },
  seeAllBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors["primaryLight"],
    borderRadius: 8,
  },
  seeAll: {
    fontSize: 14,
    color: Colors["secondary"],
  },
  categoriesList: {
    gap: 12,
    paddingHorizontal: 16,
  },
});
