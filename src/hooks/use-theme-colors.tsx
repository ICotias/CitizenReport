import { color } from "@/src/theme/color";
import { useColorScheme } from "react-native";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof color.light & keyof typeof color.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return color[theme][colorName];
  }
}
