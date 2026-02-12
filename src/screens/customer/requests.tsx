import { FilterBarItem } from "@/src/components/FilterBarItem";
import { CustomerScreensHeader } from "@/src/components/CustomerScreensHeader";
import { progressFilterProps, RequestCard } from "@/src/components/RequestCard";
import { color } from "@/src/theme/color";
import { useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FunnelIcon } from "@/src/assets/FunnelIcon";
import { useUserReports } from "@/src/hooks/useUserReports";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CostumerStackRouteProps } from "@/src/routes/CustomerRoutes";

const FILTERS = [
  { label: "Todos" },
  { label: "Pendente" },
  { label: "Em Progresso" },
  { label: "Resolvido" },
];

const STATUS_MAP: Record<string, progressFilterProps> = {
  open: "Pendente",
  in_progress: "Em Progresso",
  resolved: "Resolvido",
};

type NavigationProp = NativeStackNavigationProp<CostumerStackRouteProps>;

export function RequestScreen() {
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const { reports, loading, error } = useUserReports();
  const navigation = useNavigation<NavigationProp>();

  const filteredReports = reports
    .map((report) => ({
      id: report.id,
      description: report.description,
      date: new Date(report.createdAt).toLocaleDateString("pt-BR"),
      type: report.category,
      progress: STATUS_MAP[report.status],
      image: report.photoUrl || undefined,
      latitude: report.location.latitude,
      longitude: report.location.longitude,
    }))
    .filter((item) => {
      if (selectedFilter === "Todos") return true;
      return item.progress === selectedFilter;
    });

  const handleCardPress = (
    reportId: string,
    latitude: number,
    longitude: number,
  ) => {
    console.log("🔵 Clicou no card:", { reportId, latitude, longitude });

    navigation.navigate("map", {
      focusedReportId: reportId,
      latitude,
      longitude,
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <CustomerScreensHeader
          nav={() => {}}
          title="Minhas Solicitações"
          icon={<FunnelIcon />}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={color.dark.gray} />
          <Text style={styles.loadingText}>Carregando solicitações...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <CustomerScreensHeader
          nav={() => {}}
          title="Minhas Solicitações"
          icon={<FunnelIcon />}
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Erro ao carregar solicitações</Text>
          <Text style={styles.errorDetails}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomerScreensHeader
        nav={() => {}}
        title="Minhas Solicitações"
        icon={<FunnelIcon />}
      />
      <View style={styles.filterBarWrapper}>
        <FilterBarItem
          filterSelected={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          filters={FILTERS}
        />
      </View>
      <FlatList
        data={filteredReports}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RequestCard
            id={item.id}
            description={item.description}
            date={item.date}
            type={item.type}
            progress={item.progress as progressFilterProps}
            image={item.image}
            onPress={() =>
              handleCardPress(item.id, item.latitude, item.longitude)
            }
          />
        )}
        contentContainerStyle={styles.listContent}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              📭 Nenhuma solicitação encontrada
            </Text>
            {selectedFilter !== "Todos" && (
              <Text style={styles.emptySubtext}>
                Tente selecionar outro filtro
              </Text>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterBarWrapper: {
    paddingVertical: 8,
    width: "100%",
    borderBottomWidth: 2,
    borderColor: color.dark.gray,
    justifyContent: "center",
    backgroundColor: color.dark.white,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
    gap: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: color.dark.gray,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    gap: 8,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FF0000",
    textAlign: "center",
  },
  errorDetails: {
    fontSize: 14,
    color: color.dark.gray,
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 48,
    gap: 8,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: color.dark.gray,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 14,
    color: color.dark.gray,
    textAlign: "center",
  },
});
