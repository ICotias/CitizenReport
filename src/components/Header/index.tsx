import { ArrowLeft } from "@/src/assets/ArrowLeft";
import { color } from "@/src/theme/color";
import { typography } from "@/src/theme/typography";
import { useNavigation } from "@react-navigation/native";

import { ReactElement } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  label: string;
  rightIcon?: ReactElement;
  leftIcon?: boolean;
};

export function Header({ label, rightIcon, leftIcon }: Props) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        borderColor: color.light.gray,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: color.light.lightGray,
        gap: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
      }}
    >
      {leftIcon ? (
        <TouchableOpacity onPress={navigation.goBack}>
          <ArrowLeft size={20} />
        </TouchableOpacity>
      ) : null}
      <Text style={{ fontSize: typography.body.fontSize }}>{label}</Text>
      {rightIcon ? rightIcon : null}
    </View>
  );
}
