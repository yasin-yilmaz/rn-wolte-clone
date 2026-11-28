import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useRouter } from "expo-router";

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
  scrollOffset: SharedValue<number>;
};

const SCROLL_THRESHOLD_START = 50;
const SCROLL_THRESHOLD_END = 80;

const RestaurantDetailHeader = ({ scrollOffset }: Props) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const headerStyle = useAnimatedStyle(() => {
    const backgroundOpacity = interpolate(
      scrollOffset.value,
      [SCROLL_THRESHOLD_START, SCROLL_THRESHOLD_END],
      [0, 1],
      Extrapolation.CLAMP,
    );

    const shadowOpacity = interpolate(
      scrollOffset.value,
      [SCROLL_THRESHOLD_START, SCROLL_THRESHOLD_END],
      [0, 0.1],
      Extrapolation.CLAMP,
    );

    return {
      backgroundColor: `rgba(255, 255, 255, ${backgroundOpacity})`,
      shadowOpacity,
    };
  });

  const searchbarStyle = useAnimatedStyle(() => {
    const backgroundOpacity = interpolate(
      scrollOffset.value,
      [0, SCROLL_THRESHOLD_START],
      [0.9, 1],
      Extrapolation.CLAMP,
    );

    return {
      backgroundColor: `rgba(230, 230, 230, ${backgroundOpacity})`,
    };
  });

  const buttonStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value,
      [0, SCROLL_THRESHOLD_END],
      [1, 0],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
    };
  });
  const buttonStyle2 = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value,
      [SCROLL_THRESHOLD_START * 0.3, SCROLL_THRESHOLD_END],
      [0, 1],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
    };
  });

  return (
    <Animated.View
      style={[styles.headerContainer, headerStyle, { paddingTop: insets.top }]}
    >
      <View style={styles.headerContent}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={25} />
        </TouchableOpacity>
        <Animated.View style={[styles.searchBar, searchbarStyle]}>
          <Ionicons name="search" size={20} color={Colors["muted"]} />
          <TextInput
            style={{ fontSize: 15, color: Colors["muted"] }}
            placeholder="search"
            placeholderTextColor={Colors["muted"]}
          />
        </Animated.View>
        <View style={{ width: 40, height: 40 }} />
        <Animated.View style={[styles.iconBtn, buttonStyle]}>
          <Ionicons name="heart-outline" size={24} />
        </Animated.View>
        <Animated.View style={[styles.iconBtn, buttonStyle2]}>
          <Ionicons name="ellipsis-horizontal" size={24} />
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export default RestaurantDetailHeader;

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    boxShadow: "0px 4px 2px -2px rgba(0, 0, 0, 0.05)",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    backgroundColor: Colors["light"],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100%",
    boxShadow: "0px 4px 2px -2px rgba(0, 0, 0, 0.1)",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 12,
    // paddingVertical: 10,
    gap: 8,
    borderRadius: 20,

    // backgroundColor: "#fff",
  },
  iconBtn: {
    position: "absolute",
    top: 12,
    right: 16,
    width: 40,
    height: 40,
    backgroundColor: Colors["light"],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100%",
    boxShadow: "0px 4px 2px -2px rgba(0, 0, 0, 0.1)",
  },
});
