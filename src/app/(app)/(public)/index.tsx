import { Image, Linking, StyleSheet, Text, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import { Fonts } from "@/constants/theme";

import SocialAuthButton from "@/components/auth/SocialAuthButton";
import SmoothInfiniteScroll from "@/components/SmoothInfiniteScroll";
import woltLogoImg from "@/assets/images/wolt-logo.png";

const HomeScreen = () => {
  const openWebBrowser = () => {
    Linking.openURL("https://loremipsum.com");
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.infiniteScrollContainer}>
        <View>
          <SmoothInfiniteScroll scrollDirection="down" iconSet="set1" />
        </View>
        <View>
          <SmoothInfiniteScroll scrollDirection="up" iconSet="set2" />
        </View>
        <View>
          <SmoothInfiniteScroll scrollDirection="down" iconSet="set3" />
        </View>
        <LinearGradient
          colors={["transparent", "#fff"]}
          style={{
            position: "absolute",
            height: 100,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        />
      </View>
      <View style={styles.contentContainer}>
        <Image source={woltLogoImg} style={styles.brandLogo} />
        <Animated.Text entering={FadeInDown} style={styles.tagLine}>
          Almost every thing delivered
        </Animated.Text>
        {/* LOGIN BUTTONS */}
        <View style={styles.buttonContainer}>
          <Animated.View entering={FadeInDown.delay(100)}>
            <SocialAuthButton
              icon={<Ionicons name="logo-apple" size={24} color="#fff" />}
              title="Login with Apple"
              style={{ backgroundColor: "#000" }}

              onPress={() => {}}
            />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(200)}>
            <SocialAuthButton
              icon={<Ionicons name="logo-google" size={24} color="#fff" />}
              title="Login with Google"
              style={{ backgroundColor: "#4285f4" }}

              onPress={() => {}}
            />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(300)}>
            <SocialAuthButton
              title="Other options"
              style={{ backgroundColor: "#f0f0f0" }}
              textStyle={{ color: "#666" }}
              onPress={() => {}}
            />
          </Animated.View>
        </View>
      </View>
      <Animated.View
        style={styles.privacyContainer}
        entering={FadeInDown.delay(400)}
      >
        <Text style={styles.privacyText}>
          Please Vist{" "}
          <Text style={styles.privacyLink} onPress={openWebBrowser}>
            Wolt Privacy statement
          </Text>{" "}
          to learn personal data processing al Wolt
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  brandLogo: {
    width: 120,
    height: 52,
    resizeMode: "contain",
  },
  tagLine: {
    fontSize: 30,
    fontFamily: Fonts["brandBlack"],
    textAlign: "center",
    marginBottom: 30,
  },
  buttonContainer: {
    gap: 12,
    width: "100%",
  },
  privacyContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  privacyText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    lineHeight: 18,
  },
  privacyLink: {
    color: "#4285f4",
    textDecorationLine: "underline",
  },
  infiniteScrollContainer: {
    flex: 0.8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    position: "relative",
    overflow: "hidden",
  },
});
