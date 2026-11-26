import { Text, View } from "react-native";

import { Link, useLocalSearchParams } from "expo-router";

const RestaurantDetailModal = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View>
      <Text>Restaurant Detail: {id}</Text>
      <Link href="/(app)/(tabs)/(restaurants)/">asd</Link>
    </View>
  );
};

export default RestaurantDetailModal;
