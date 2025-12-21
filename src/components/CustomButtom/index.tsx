import { color } from "@/src/theme/color";
import { typography } from "@/src/theme/typography";
import { ReactElement, ReactSVGElement } from "react";
import {
  ButtonProps,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

type ButtonVariant = "fill" | "outlined" | "bordered";

type Props = ButtonProps & {
  variant?: ButtonVariant;
  style?: StyleProp<ViewStyle>;
  textColor?: string;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.JSX.Element;
};

export function Button({
  variant = "fill",
  title,
  onPress,
  style,
  textColor,
  textStyle,
  icon,
  ...rest
}: Props) {
  let buttonStyle: StyleProp<ViewStyle>;
  let defaultTextColor: string;

  if (variant === "fill") {
    buttonStyle = {
      backgroundColor: color.light.black,
      width: "100%",
      height: 60,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      gap: 5,
    };
    defaultTextColor = color.light.white;
  } else if (variant === "outlined" || variant === "bordered") {
    buttonStyle = {
      backgroundColor: color.light.white,
      width: "100%",
      height: 60,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      flexDirection: "row",
      gap: 5,
    };
    defaultTextColor = color.light.black;
  } else {
    buttonStyle = {};
    defaultTextColor = color.light.black;
  }

  return (
    <TouchableOpacity style={[buttonStyle, style]} onPress={onPress} {...rest}>
      {icon ? icon : null}
      <Text
        style={[
          {
            fontSize: typography.h2.fontSize,
            fontWeight: typography.body.fontWeight,
            color: textColor ?? defaultTextColor,
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
