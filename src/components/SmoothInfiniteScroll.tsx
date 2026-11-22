import { StyleSheet, Text, View } from "react-native";

import Animated, {
  scrollTo,
  useAnimatedRef,
  useFrameCallback,
  useSharedValue,
} from "react-native-reanimated";

import { iconDataSets } from "@/constants/icon-data";

type Props = {
  scrollDirection?: "up" | "down";
  iconSet?: keyof typeof iconDataSets;
};

const ITEM_HEIGHT = 160;
const SCROLL_SPEED = 20;
const GAP = 10;

const SmoothInfiniteScroll = ({
  iconSet = "set1",
  scrollDirection = "down",
}: Props) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const scrollY = useSharedValue(0);
  const initialized = useSharedValue(false);

  const iconData = iconDataSets[iconSet];
  const items = [...iconData, ...iconData];

  const totalContentHeight = (ITEM_HEIGHT + GAP) * iconData.length;

  useFrameCallback((frameInfo) => {
    if (!frameInfo.timeSincePreviousFrame) {
      if (!initialized.value) {
        const initialY = scrollDirection === "up" ? totalContentHeight : 0;

        scrollY.value = initialY;
        scrollTo(scrollRef, 0, initialY, false);
        initialized.value = true;
      }

      return;
    }

    if (!initialized.value) return;

    const delta = SCROLL_SPEED * (frameInfo.timeSincePreviousFrame / 1000);

    const direction = scrollDirection === "up" ? -1 : 1;

    let nextY = scrollY.value + delta * direction;

    if (scrollDirection === "down" && nextY >= totalContentHeight) {
      nextY -= totalContentHeight;
    } else if (scrollDirection === "up" && nextY <= 0) {
      nextY += totalContentHeight;
    }

    scrollY.value = nextY;
    scrollTo(scrollRef, 0, nextY, false);
  });

  return (
    <Animated.ScrollView
      ref={scrollRef}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {items.map((item, index) => (
        <View
          key={index}
          style={[styles.iconContainer, { backgroundColor: item.color }]}
        >
          <Text style={{ fontSize: 40 }}>{item.emoji}</Text>
        </View>
      ))}
    </Animated.ScrollView>
  );
};

export default SmoothInfiniteScroll;

const styles = StyleSheet.create({
  container: {
    gap: GAP,
    paddingVertical: 20,
  },
  iconContainer: {
    width: 160,
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginHorizontal: 5,
    boxShadow: "0px -2px 10px rgba(0,0,0,.1)",
  },
});
