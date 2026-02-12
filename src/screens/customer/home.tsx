import { HomeCard } from "@/src/components/HomeCards";
import { RecentActivityCard } from "@/src/components/RecentActivityCard";
import { Spacer } from "@/src/components/Spacer";
import {
  CostumerRouteProps,
  CostumerStackRouteProps,
} from "@/src/routes/CustomerRoutes";
import { color } from "@/src/theme/color";
import { typography } from "@/src/theme/typography";
import { useNavigation } from "@react-navigation/native";
import { FlatList, Text, View, Pressable } from "react-native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Map } from "@/src/components/Map";
import { useCurrentUser } from "@/src/contexts/currentUser";
import { useState } from "react";
import { useAllReports } from "@/src/hooks/useAllReports";
import { useRecentActivities } from "@/src/hooks/useRecentActivities";

type StackNav = NativeStackNavigationProp<CostumerStackRouteProps>;
type TabNav = BottomTabNavigationProp<CostumerRouteProps>;

export function HomeScreen() {
  const stackNavigation = useNavigation<StackNav>();
  const tabNavigation = useNavigation<TabNav>();
  const { currentUser } = useCurrentUser();

  const { reports } = useAllReports();
  const { activities, loading: activitiesLoading } = useRecentActivities();

  const [mapPressed, setMapPressed] = useState(false);

  return (
    <FlatList
      data={activities}
      ListHeaderComponent={
        <>
          <View
            style={{
              height: 210,
              backgroundColor: color.light.black,
              paddingTop: 70,
              paddingHorizontal: 24,
              gap: 5,
            }}
          >
            <Text
              style={{
                color: color.light.gray,
                fontSize: typography.body.fontSize,
              }}
            >
              Olá, {currentUser?.displayName}!
            </Text>
            <Text
              style={{
                color: color.light.white,
                fontSize: typography.h1.fontSize,
              }}
            >
              São Paulo - Centro
            </Text>
          </View>

          <Pressable
            onPressIn={() => setMapPressed(true)}
            onPressOut={() => setMapPressed(false)}
            onPress={() => stackNavigation.navigate("map")}
            style={{
              alignSelf: "center",
              width: "85%",
              height: 240,
              borderRadius: 12,
              padding: 1,
              borderWidth: 1,
              borderColor: color.light.darkGray,
              marginTop: -70,
            }}
          >
            <View style={{ flex: 1, borderRadius: 12, overflow: "hidden" }}>
              <Map
                isButton
                problems={reports.map((report) => ({
                  id: report.id,
                  latitude: report.latitude,
                  longitude: report.longitude,
                  title: report.title || report.description,
                  description: report.description,
                  filterType: report.filterType,
                  address: report.address,
                }))}
              />

              {mapPressed && (
                <View
                  pointerEvents="none"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.05)",
                    borderRadius: 12,
                  }}
                />
              )}
            </View>
          </Pressable>

          <View
            style={{
              backgroundColor: color.light.lightGray,
              paddingHorizontal: 24,
              paddingTop: 30,
            }}
          >
            <Text style={{ fontSize: typography.h2.fontSize }}>
              Ações rápidas
            </Text>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                marginTop: 16,
              }}
            >
              <HomeCard
                title="Reportar Problema"
                iconType="plus"
                onPress={() => stackNavigation.navigate("ReportProblem")}
              />
              <HomeCard
                title="Minhas Solicitações"
                iconType="papers"
                onPress={() => tabNavigation.navigate("Requests")}
              />
            </View>
            <Spacer size="md" />

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <HomeCard
                title="Enquete"
                iconType="graphic"
                onPress={() => stackNavigation.navigate("survey")}
              />
              <HomeCard
                title="Mapa"
                iconType="map"
                onPress={() => stackNavigation.navigate("map")}
              />
            </View>
            <Spacer size="xl" />
            <Text style={{ fontSize: typography.h2.fontSize }}>
              Atividade Recente
            </Text>
            <Spacer size="md" />
          </View>
        </>
      }
      contentContainerStyle={{
        backgroundColor: color.light.lightGray,
        paddingBottom: 80,
      }}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <RecentActivityCard
          title={item.title}
          description={item.description || ""}
          inProgress={
            item.type === "report_created" || item.type === "report_updated"
          }
          photoUrl={item.photoUrl}
        />
      )}
      ItemSeparatorComponent={() => <Spacer size="xs" />}
      ListEmptyComponent={
        !activitiesLoading ? (
          <View style={{ paddingHorizontal: 24, paddingBottom: 24 }}>
            <Text style={{ color: color.dark.darkGray }}>
              Nenhuma atividade recente.
            </Text>
          </View>
        ) : null
      }
    />
  );
}
