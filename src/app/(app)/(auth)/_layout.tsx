import { TouchableOpacity } from "react-native";

import { Stack, useRouter } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

const AuthLayout = () => {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modal)/locations"
        options={{
          presentation: "formSheet",
          sheetAllowedDetents: [0.7],
          title: "",
          sheetCornerRadius: 16,
          sheetGrabberVisible: true,
          headerRight: () => (
            <TouchableOpacity onPress={() => router.dismiss()}>
              <Ionicons name="close-sharp" size={28} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="(modal)/filter"
        options={{
          presentation: "formSheet",
          sheetAllowedDetents: [0.8],
          title: "",
          sheetCornerRadius: 16,
          sheetGrabberVisible: true,
          headerRight: () => (
            <TouchableOpacity onPress={() => router.dismiss()}>
              <Ionicons name="close-sharp" size={28} />
            </TouchableOpacity>
          ),
          contentStyle: {
            backgroundColor: "#fff",
          },
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
