import { ArrowLeftIcon } from "@/src/assets/ArrowLeftIcon";
import { color } from "@/src/theme/color";
import { typography } from "@/src/theme/typography";
import { useNavigation } from "@react-navigation/native";

import { ReactElement } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  StyleProp,
} from "react-native";

type Props = {
  label: string;
  rightIcon?: ReactElement;
  leftIcon?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Header({ label, rightIcon, leftIcon, style }: Props) {
  const navigation = useNavigation();

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          paddingHorizontal: 10,
          paddingVertical: 15,
        },
        style,
      ]}
    >
      {leftIcon ? (
        <TouchableOpacity onPress={navigation.goBack}>
          <ArrowLeftIcon size={24} />
        </TouchableOpacity>
      ) : null}
      <Text style={{ fontSize: typography.h2.fontSize }}>{label}</Text>
      {rightIcon ? rightIcon : null}
    </View>
  );
}
