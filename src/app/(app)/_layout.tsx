import { BlankStack } from "react-native-screen-transitions/expo-router";

import useUserStore from "@/hooks/useUserStore";

const RootNav = () => {
  const isGuest = useUserStore((state) => state.isGuest);
  const user = useUserStore((state) => state.user);

  return (
    <BlankStack>
      <BlankStack.Protected guard={isGuest || !!user}>
        <BlankStack.Screen name="(auth)" />
      </BlankStack.Protected>

      <BlankStack.Protected guard={!isGuest && !user}>
        <BlankStack.Screen name="(public)" />
      </BlankStack.Protected>
    </BlankStack>
  );
};

export default RootNav;
