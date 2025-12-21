import { color } from "@/src/theme/color";
import { Text, TouchableOpacity, View } from "react-native";

export type PageVariants = "login" | "register";

export type PageProps = {
  wichPage: PageVariants;
  onChange: (page: PageVariants) => void;
};

export function SwitchPage({ wichPage, onChange }: PageProps) {
  return (
    <View
      style={{
        backgroundColor: color.light.gray,
        flexDirection: "row",
        width: "100%",
        height: 60,
        borderRadius: 12,
        padding: 4,
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
        marginBottom: 40,
      }}
    >
      {/* LOGIN */}
      <TouchableOpacity
        style={{
          backgroundColor:
            wichPage === "login" ? color.light.white : color.light.gray,
          width: "48%",
          height: 52,
          borderRadius: 12,
          borderWidth: 0.5,
          borderColor:
            wichPage === "login" ? color.light.lightGray : color.light.gray,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => onChange("login")}
      >
        <Text>Login</Text>
      </TouchableOpacity>

      {/* REGISTER */}
      <TouchableOpacity
        style={{
          backgroundColor:
            wichPage === "register" ? color.light.white : color.light.gray,
          width: "48%",
          height: 52,
          borderRadius: 12,
          borderWidth: 0.5,
          borderColor:
            wichPage === "register" ? color.light.lightGray : color.light.gray,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => onChange("register")}
      >
        <Text>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}
