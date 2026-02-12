import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "@/src/screens/customer/Home";
import { MessagesScreen } from "@/src/screens/customer/Messages";
import { ProfileScreen } from "@/src/screens/customer/Profile";
import { RequestScreen } from "@/src/screens/customer/Requests";

import { UserIcon } from "@/src/assets/UserIcon";
import { HomeIcon } from "@/src/assets/HomeIcon";
import { FileTextIcon } from "@/src/assets/FileTextIcon";
import { MessageIcon } from "@/src/assets/MessageIcon";
import { color } from "@/src/theme/color";
import { NavigatorScreenParams } from "@react-navigation/native";
import { SurveyScreen } from "@/src/screens/customer/Survey";
import { ProblemsMap } from "@/src/screens/customer/ProblemsMap";
import { ReportProblem } from "@/src/screens/customer/ReportProblem";

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
  Tabs: NavigatorScreenParams<CostumerRouteProps>;
  ReportProblem: undefined;
  survey: undefined;
  map:
    | {
        focusedReportId?: string;
        latitude?: number;
        longitude?: number;
      }
    | undefined;
};

const Tab = createBottomTabNavigator<CostumerRouteProps>();
const Stack = createNativeStackNavigator<CostumerStackRouteProps>();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 80,
          paddingHorizontal: 35,
          paddingBottom: 20,
        },
        tabBarActiveTintColor: color.dark.black,
        tabBarInactiveTintColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size = 24, color }) => (
            <HomeIcon color={color} size={size} />
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
            <UserIcon color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function CustomerRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="ReportProblem" component={ReportProblem} />
      <Stack.Screen name="survey" component={SurveyScreen} />
      <Stack.Screen name="map" component={ProblemsMap} />
    </Stack.Navigator>
  );
}
