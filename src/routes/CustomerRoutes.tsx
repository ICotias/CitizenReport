import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "@/src/screens/customer/home";
import { MessagesScreen } from "@/src/screens/customer/messages";
import { ProfileScreen } from "@/src/screens/customer/profile";
import { RequestScreen } from "@/src/screens/customer/requests";
import { ReportProblem } from "@/src/screens/customer/reportProblem";

import { User } from "@/src/assets/User";
import { Home } from "@/src/assets/Home";
import { FileTextIcon } from "@/src/assets/FileText";
import { MessageIcon } from "@/src/assets/MessageIcon";
import { color } from "@/src/theme/color";

export type CostumerRouteProps = {
  Home: undefined;
  Requests: undefined;
  Messages: undefined;
  Profile: {
    name: string;
    email: string;
    city: string;
    neighborhood: string;
    reports: string;
    resolvedReports: string;
    months: string;
  };
};

export type CostumerStackRouteProps = {
  Tabs: undefined;
  reportProblem: undefined;
};

const Tab = createBottomTabNavigator<CostumerRouteProps>();
const Stack = createNativeStackNavigator<CostumerStackRouteProps>();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 80,
          paddingHorizontal: 35,
          paddingBottom: 20,
        },
        tabBarActiveTintColor: color.dark.black,
        tabBarInactiveTintColor: "rgba(0, 0, 0, 0.5)",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size = 24, color }) => (
            <Home color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Requests"
        component={RequestScreen}
        options={{
          tabBarIcon: ({ size = 24, color }) => (
            <FileTextIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarIcon: ({ size = 24, color }) => (
            <MessageIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{
          name: "Iago Cotias",
          email: "iagocotias10@gmail.com",
          city: "Feira de Santana",
          neighborhood: "Mangabeira",
          reports: "20",
          resolvedReports: "12",
          months: "5",
        }}
        options={{
          tabBarIcon: ({ size = 24, color }) => (
            <User color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function CustomerRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="reportProblem"
        component={ReportProblem}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
