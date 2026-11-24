import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Link } from "expo-router";

import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/constants/theme";

type Props = {
  title: string;
  scrollOffset: SharedValue<number>;
};

const SCROLL_THRESHOLD = 60;

const RestaurantHeader = ({ title, scrollOffset }: Props) => {
  const insets = useSafeAreaInsets();

  const header1Style = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value,
      [0, SCROLL_THRESHOLD * 0.6],
      [1, 0],
      Extrapolation.CLAMP,
    );
    const translateY = interpolate(
      scrollOffset.value,
      [0, SCROLL_THRESHOLD * 0.6],
      [0, -10],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });
  const header2Style = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value,
      [0, SCROLL_THRESHOLD * 0.6],
      [0, 1],
      Extrapolation.CLAMP,
    );
    const translateY = interpolate(
      scrollOffset.value,
      [0, SCROLL_THRESHOLD * 0.6],
      [10, 0],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const shadowStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value,
      [0, SCROLL_THRESHOLD],
      [0, 1],
      Extrapolation.CLAMP,
    );

    return {
      shadowOpacity: opacity * 0.1,
      elevation: opacity * 4,
    };
  });

  return (
    <Animated.View
      style={[styles.headerContainer, shadowStyle, { paddingTop: insets.top }]}
    >
      {/* HEADER FIRST SEEN */}
      <Animated.View style={[styles.header1, header1Style]}>
        <Link href="/(app)/(auth)/(modal)/locations" asChild>
          <TouchableOpacity style={styles.locationBtn}>
            <View style={styles.locationBtnIcon}>
              <Ionicons name="business-outline" size={16} />
            </View>
            <Text style={styles.locationText}>London</Text>
            <Ionicons name="chevron-down" size={16} />
          </TouchableOpacity>
        </Link>
        <View style={styles.rightIcons}>
          <Link href="/(app)/(auth)/(modal)/filter" asChild>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="filter" size={20} />
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="map-outline" size={20} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* HEADER SECOND SEEN */}
      <Animated.View style={[styles.header2, header2Style]}>
        <View style={styles.centerContent}>
          <Text style={styles.titleSmall}>{title}</Text>
          <Link href="/(app)/(auth)/(modal)/locations" asChild>
            <TouchableOpacity style={styles.locationSmallBtn}>
              <Text style={styles.locationSmallText}>London</Text>
              <Ionicons name="chevron-down" size={14} />
            </TouchableOpacity>
          </Link>
        </View>
        <View style={styles.rightIcons}>
          <Link href="/(app)/(auth)/(modal)/filter" asChild>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="filter" size={20} />
            </TouchableOpacity>
          </Link>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

export default RestaurantHeader;

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    zIndex: 100,
    // elevation: 2,
  },
  header1: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header2: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,

    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    gap: 6,
  },
  locationBtnIcon: {
    borderRadius: 20,
    backgroundColor: Colors["light"],
    padding: 10,
  },
  locationText: {
    fontSize: 14,
    fontWeight: "600",
  },
  rightIcons: {
    flexDirection: "row",
    gap: 8,
  },
  iconBtn: {
    width: 40,
    height: 40,
    backgroundColor: Colors["light"],
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    paddingLeft: 40,
  },
  titleSmall: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },
  locationSmallBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationSmallText: {
    fontSize: 12,
    color: Colors["muted"],
  },
});
