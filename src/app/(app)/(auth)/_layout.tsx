import Transition from "react-native-screen-transitions";
import { BlankStack } from "react-native-screen-transitions/expo-router";

const AuthLayout = () => {
  return (
    <BlankStack>
      <BlankStack.Screen name="(tabs)" />
      <BlankStack.Screen
        name="(modal)/(restaurant)/[id]"
        options={Transition.Presets.DraggableCard()}
      />
      <BlankStack.Screen
        name="(modal)/locations"
        options={Transition.Presets.SlideFromTop()}
      />

      <BlankStack.Screen
        name="(modal)/filter"
        options={Transition.Presets.SlideFromTop()}
      />

      <BlankStack.Screen
        name="(modal)/map"
        options={Transition.Presets.SlideFromBottom()}
      />
    </BlankStack>
  );
};

export default AuthLayout;
