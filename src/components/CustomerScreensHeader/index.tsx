import { color } from "@/src/theme/color";
import { typography } from "@/src/theme/typography";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  nav?: () => void;
  title: string;
  icon?: React.JSX.Element;
};

export function CustomerScreensHeader({ nav, title, icon }: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        borderBottomWidth: 2,
        borderColor: color.dark.gray,
        paddingBottom: 18,
      }}
    >
      <TouchableOpacity onPress={nav}>{icon}</TouchableOpacity>

      <Text
        style={{
          fontSize: typography.body.fontSize,
          fontWeight: "500",
        }}
      >
        {title}
      </Text>
    </View>
  );
}
