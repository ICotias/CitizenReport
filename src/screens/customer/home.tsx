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

import { FlatList, Text, View } from "react-native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const recentActivities = [
  {
    id: "1",
    title: "Solicitação enviada",
    description: "Sua solicitação de reparo foi enviada com sucesso.",
    inProgress: true,
  },
  {
    id: "2",
    title: "Atualização",
    description: "A prefeitura começou o reparo na rua próxima.",
    inProgress: false,
  },
  {
    id: "3",
    title: "Notificação",
    description: "Novo evento cadastrado na sua região.",
    inProgress: true,
  },
];

type StackNav = NativeStackNavigationProp<CostumerStackRouteProps>;
type TabNav = BottomTabNavigationProp<CostumerRouteProps>;

export function HomeScreen() {
  const stackNavigation = useNavigation<StackNav>();
  const tabNavigation = useNavigation<TabNav>();

  return (
    <FlatList
      data={recentActivities}
      ListHeaderComponent={
        <>
          <View
            style={{
              height: 190,
              backgroundColor: color.light.black,
              paddingTop: 50,
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
              Olá, Usuário!
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

          <View
            style={{
              alignSelf: "center",
              width: "85%",
              height: 240,
              backgroundColor: color.light.gray,
              borderRadius: 12,
              padding: 20,
              borderWidth: 1,
              borderColor: color.light.darkGray,
              justifyContent: "center",
              alignItems: "center",
              marginTop: -70,
            }}
          >
            <Text
              style={{
                color: color.light.darkGray,
                fontSize: typography.body.fontSize,
              }}
            >
              [Mapa com relatórios próximos]
            </Text>
          </View>

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
                onPress={() => stackNavigation.navigate("reportProblem")}
              />
              <HomeCard
                title="Minhas Solicitações"
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
              <HomeCard title="Notícias da Cidade" iconType="papers" />
              <HomeCard title="Eventos" iconType="calendar" />
            </View>
            <Spacer size="xl" />
            <Text style={{ fontSize: typography.h2.fontSize }}>
              Atividade Recente
            </Text>
            <Spacer size="md" />
          </View>
        </>
      }
      contentContainerStyle={{ backgroundColor: color.light.lightGray }}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <RecentActivityCard
          title={item.title}
          description={item.description}
          inProgress={item.inProgress}
        />
      )}
      ItemSeparatorComponent={() => <Spacer size="xs" />}
    />
  );
}
