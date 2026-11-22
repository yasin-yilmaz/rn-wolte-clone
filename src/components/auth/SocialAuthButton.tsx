import type { ReactNode } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  type TextStyle,
  type TouchableOpacityProps,
} from "react-native";

type Props = TouchableOpacityProps & {
  icon?: ReactNode;
  title: string;
  textStyle?: TextStyle;
};

const SocialAuthButton = ({
  icon,
  title,
  textStyle,
  style,
  ...props
}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      activeOpacity={0.8}
      {...props}
    >
      {icon}
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SocialAuthButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
});
