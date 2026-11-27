import { StyleSheet, Text, View } from "react-native";

import { Link, useLocalSearchParams } from "expo-router";

import { Colors } from "@/constants/theme";

const RestaurantDetailModal = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <Text>Restaurant Detail: {id}</Text>
      <Link href="/(app)/(tabs)/(restaurants)/">asd</Link>
    </View>
  );
};

export default RestaurantDetailModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors["background"],
  },
});
