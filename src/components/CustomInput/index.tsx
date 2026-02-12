import React, { forwardRef, useState } from "react";
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
  TouchableOpacity,
} from "react-native";
import { EyeIcon, ClosedEyeIcon } from "@/src/assets";

type Props = TextInputProps & {
  isPassword?: boolean;
  headline?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export const CustomInput = forwardRef<TextInput, Props>(
  (
    {
      placeholder,
      headline,
      style,
      containerStyle,
      isPassword,
      textStyle,
      ...props
    },
    ref,
  ) => {
    const [hidePassword, setHidePassword] = useState(true);

    return (
      <>
        {headline && (
          <Text
            style={[
              { fontSize: typography.body.fontSize, marginVertical: 6 },
              textStyle,
            ]}
          >
            {headline}
          </Text>
        )}

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
              flexDirection: "row",
              alignItems: "center",
            },
            containerStyle,
          ]}
        >
          <TextInput
            ref={ref}
            placeholder={placeholder}
            placeholderTextColor={color.light.darkGray}
            secureTextEntry={isPassword ? hidePassword : false}
            style={[{ flex: 1 }, style]}
            {...props}
          />

          {isPassword && (
            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
              {hidePassword ? (
                <EyeIcon size={20} color={color.light.darkGray} />
              ) : (
                <ClosedEyeIcon size={20} color={color.light.darkGray} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </>
    );
  },
);
