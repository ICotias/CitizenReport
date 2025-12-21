import { CurrentUserProvider } from "@/src/contexts/currentUser";
import { RootRoutes } from "@/src/routes/RootRoutes";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <CurrentUserProvider>
        <StatusBar />
        <RootRoutes />
      </CurrentUserProvider>
    </SafeAreaProvider>
  );
}
