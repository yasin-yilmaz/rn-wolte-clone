import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useRouter } from "expo-router";

import Animated, { FadeInDown } from "react-native-reanimated";

import { Ionicons } from "@expo/vector-icons";

import { Colors, Fonts } from "@/constants/theme";

import SocialAuthButton from "@/components/auth/SocialAuthButton";
import useUserStore from "@/hooks/useUserStore";

const OtherOptionsScreen = () => {
  const setIsGuest = useUserStore((state) => state.setIsGuest);

  const router = useRouter();

  const continueAsGuestHandler = () => setIsGuest(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => router.dismiss()}
      >
        <Ionicons name="close" size={24} />
      </TouchableOpacity>
      <Text style={styles.title}>Login or create an account</Text>
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
            icon={<Ionicons name="logo-facebook" size={24} color="#dfe3ee" />}
            title="Login with Facebook"
            style={{ backgroundColor: "#3b5998" }}

            onPress={() => {}}
          />
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(300)}>
          <SocialAuthButton
            title="Continue as Guest"
            style={{ backgroundColor: "transparent" }}
            textStyle={{ color: Colors["secondary"] }}
            onPress={continueAsGuestHandler}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default OtherOptionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  closeBtn: {
    backgroundColor: Colors["light"],
    borderRadius: 40,
    padding: 8,
    alignSelf: "flex-end",
  },
  title: {
    fontSize: 30,
    fontFamily: Fonts["brandBlack"],
    marginVertical: 22,
  },
  buttonContainer: {
    gap: 12,
    width: "100%",
  },
});
