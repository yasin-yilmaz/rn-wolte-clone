import { StyleSheet, Text, View } from "react-native";

import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Fonts } from "@/constants/theme";

import CategoryLIst from "@/components/CategoryList";
import RestaurantLIst from "@/components/RestaurantList";

import RestaurantHeader from "../RestaurantHeader";

const RestaurantListScreen = () => {
  const insets = useSafeAreaInsets();
  const scrollOffset = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      console.log(event.contentOffset.y);

      scrollOffset.value = event.contentOffset.y;
    },
  });

  return (
    <View style={styles.container}>
      <RestaurantHeader title="Restaurants" scrollOffset={scrollOffset} />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
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
