import { OnBoarding } from "@/src/screens/auths/OnBoarding";
import { WelcomeScreen } from "@/src/screens/auths/Welcome";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type AuthRouteProps = {
  OnBoarding: { page: "login" | "register" } | undefined;
  Welcome: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<AuthRouteProps>();
export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Welcome" component={WelcomeScreen} />
      <Screen name="OnBoarding" component={OnBoarding} />
    </Navigator>
  );
}
