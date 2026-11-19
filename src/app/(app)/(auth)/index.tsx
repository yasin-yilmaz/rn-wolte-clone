import React from "react";
import { Button, View } from "react-native";

import useUserStore from "@/hooks/useUserStore";

const AuthScreen = () => {
  const setIsGuest = useUserStore((state) => state.setIsGuest);

  return (
    <View>
      <Button title="Go login" onPress={() => setIsGuest(false)} />
    </View>
  );
};

export default AuthScreen;
