import { useFonts } from "expo-font";
import { Slot } from "expo-router";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  Nunito_400Regular,
  Nunito_700Bold,
  Nunito_900Black,
} from "@expo-google-fonts/nunito";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const RootLayout = () => {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_900Black,
  });

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Slot />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
