import { color } from "@/src/theme/color";
import { typography } from "@/src/theme/typography";
import { Text, TextInput, TextInputProps, View } from "react-native";

type Props = TextInputProps & {
  isPassword?: boolean;
  headline?: string;
};

export function CustomInput({
  placeholder,
  headline,
  style,
  isPassword,
  ...props
}: Props) {
  return (
    <>
      <Text style={{ fontSize: typography.body.fontSize, marginVertical: 6 }}>
        {headline}
      </Text>
      <View
        style={{
          width: "100%",
          backgroundColor: color.light.white,
          borderRadius: 10,
          paddingHorizontal: 16,
          height: 50,
          justifyContent: "center",
          borderColor: color.light.gray,
          borderWidth: 2,
          marginBottom: 10,
        }}
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
