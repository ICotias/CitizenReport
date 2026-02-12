import { useCurrentUser } from "@/src/contexts/currentUser";
import { AuthRoutes } from "@/src/routes/AuthRoutes";
import { CustomerRoutes } from "@/src/routes/CustomerRoutes";
import { color } from "@/src/theme/color";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native"; // ✅ Adicione

export function RootRoutes() {
  const { isAuthenticated, loading } = useCurrentUser(); // ✅ Adicione loading

  // ✅ Mostra loading enquanto verifica autenticação
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" color={color.dark.gray} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <CustomerRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
