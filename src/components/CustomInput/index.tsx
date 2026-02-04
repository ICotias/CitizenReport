import { color } from "@/src/theme/color";
import { typography } from "@/src/theme/typography";
import {
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
  StyleProp,
  TextStyle,
} from "react-native";

type Props = TextInputProps & {
  isPassword?: boolean;
  headline?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function CustomInput({
  placeholder,
  headline,
  style,
  containerStyle,
  isPassword,
  textStyle,
  ...props
}: Props) {
  return (
    <>
      <Text
        style={[
          { fontSize: typography.body.fontSize, marginVertical: 6 },
          textStyle,
        ]}
      >
        {headline}
      </Text>
      <View
        style={[
          {
            width: "100%",
            backgroundColor: color.light.white,
            borderRadius: 10,
            paddingHorizontal: 16,
            height: 50,
            justifyContent: "center",
            borderColor: color.light.gray,
            borderWidth: 2,
            marginBottom: 10,
          },
          containerStyle,
        ]}
      >
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={color.light.darkGray}
          secureTextEntry={isPassword}
          style={style}
          {...props}
        />
      </View>
    </>
  );
}
