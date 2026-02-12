import { FileTextIcon } from "@/src/assets/FileTextIcon";
import { MapPinIcon } from "@/src/assets/MapPinIcon";
import { UsersIcon } from "@/src/assets/UsersIcon";
import { Button } from "@/src/components/CustomButtom";
import { AuthRouteProps } from "@/src/routes/AuthRoutes";
import { color } from "@/src/theme/color";
import { typography } from "@/src/theme/typography";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type AuthNavProp = NativeStackNavigationProp<AuthRouteProps>;

export function WelcomeScreen() {
  const navigation = useNavigation<AuthNavProp>();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 12,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: color.light.lightGray,
          paddingVertical: 120,
          borderRadius: 12,
          borderColor: color.light.gray,
          borderWidth: 2,
          gap: 10,
          width: "80%",
        }}
      >
        <UsersIcon size={46} color={color.light.darkGray} />
        <MapPinIcon size={46} color={color.light.darkGray} />
        <FileTextIcon size={46} color={color.light.darkGray} />
      </View>

      <View
        style={{
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={[
            {
              fontSize: typography.h2.fontSize,
              fontWeight: typography.caption.fontWeight,
            },
          ]}
        >
          Cidadão Conectado
        </Text>
        <Text
          style={{
            fontSize: typography.body.fontSize,
            color: color.light.darkGray,
          }}
        >
          Relate problemas, acompanhe solicitações e ajude a melhorar sua cidade
        </Text>
      </View>

      <Button
        onPress={() => navigation.navigate("OnBoarding", { page: "register" })}
        title="Criar conta"
      />
      <Button
        variant="outlined"
        title="Fazer login"
        onPress={() => navigation.navigate("OnBoarding", { page: "login" })}
      />
    </SafeAreaView>
  );
}
