import { useCurrentUser } from "@/src/contexts/currentUser";
import { AuthRoutes } from "@/src/routes/AuthRoutes";
import { CustomerRoutes } from "@/src/routes/CustomerRoutes";
import { NavigationContainer } from "@react-navigation/native";

export function RootRoutes() {
  const { currentUser } = useCurrentUser();
  return (
    <NavigationContainer>
      {currentUser ? <CustomerRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
