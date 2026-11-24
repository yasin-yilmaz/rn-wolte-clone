import { StyleSheet, Text, View } from "react-native";

import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Fonts } from "@/constants/theme";

import CategoryLIst from "@/components/CategoryList";
import RestaurantLIst from "@/components/RestaurantList";

const RestaurantListScreen = () => {
  const insets = useSafeAreaInsets();

  console.log(insets);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + 60 }}
      >
        <Text style={styles.pageTitle}>Restaurants</Text>
        <CategoryLIst />
        <Text style={styles.allRestaurantsTitle}>All restaurants</Text>
        <RestaurantLIst />
      </Animated.ScrollView>
    </View>
  );
};

export default RestaurantListScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageTitle: {
    fontFamily: Fonts["brandBlack"],
    fontSize: 30,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  allRestaurantsTitle: {
    fontFamily: Fonts["brandBold"],
    fontSize: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});
