import { Stack } from "expo-router";

import useUserStore from "@/hooks/useUserStore";

const RootNav = () => {
  const isGuest = useUserStore((state) => state.isGuest);
  const user = useUserStore((state) => state.user);

  return (
    <Stack>
      <Stack.Protected guard={isGuest || user}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!isGuest && !user}>
        <Stack.Screen name="(public)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
};

export default RootNav;
