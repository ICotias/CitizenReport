import { FilterBarItem } from "@/src/components/FilterBarItem";
import { CustomerScreensHeader } from "@/src/components/CustomerScreensHeader";
import { progressFilterProps, RequestCard } from "@/src/components/RequestCard";
import { color } from "@/src/theme/color";
import { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Funnel from "@/src/assets/Funnel";

const FILTERS = [
  { label: "Todos" },
  { label: "Pendente" },
  { label: "Em Progresso" },
  { label: "Resolvido" },
];

export function RequestScreen() {
  const [selectedFilter, setSelectedFilter] = useState("Todos");

  const mockRequests = [
    {
      id: "#123112",
      description: "Pedido de manutenção do ar-condicionado",
      date: "2024-05-01",
      type: "Manutenção",
      progress: "Pendente",
      image: undefined,
    },
    {
      id: "#423422",
      description: "Conserto da luminária da sala",
      date: "2024-05-03",
      type: "Elétrica",
      progress: "Em Progresso",
      image: undefined,
    },
    {
      id: "#232432",
      description: "Reparo na porta da cozinha",
      date: "2024-05-05",
      type: "Carpintaria",
      progress: "Resolvido",
      image: undefined,
    },
  ];

  const filteredMockRequests = mockRequests.filter(
    (item) => item.progress === selectedFilter,
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomerScreensHeader
        nav={() => {}}
        title="Minhas Solicitações"
        icon={<Funnel />}
      />
      <View style={styles.filterBarWrapper}>
        <FilterBarItem
          filterSelected={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          filters={FILTERS}
        />
      </View>
      <FlatList
        data={selectedFilter === "Todos" ? mockRequests : filteredMockRequests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RequestCard
            id={item.id}
            description={item.description}
            date={item.date}
            type={item.type}
            progress={item.progress as progressFilterProps}
            image={item.image}
          />
        )}
        contentContainerStyle={styles.listContent}
        style={styles.list}
        showsVerticalScrollIndicator={false}
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
});
