import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { color } from "@/src/theme/color";
import { Map } from "@/src/components/Map";
import { RoadIcon } from "@/src/assets/RoadIcon";
import { Header } from "@/src/components/Header";
import { TrashIcon } from "@/src/assets/TrashIcon";
import { MapPinIcon } from "@/src/assets/MapPinIcon";
import { PoliceIcon } from "@/src/assets/PoliceIcon";
import { HospitalIcon } from "@/src/assets/HospitalIcon";
import { LightbulbIcon } from "@/src/assets/LightbulbIcon";
import React, { JSX, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FilterBarItem } from "@/src/components/FilterBarItem";
import { useAllReports } from "@/src/hooks/useAllReports";
import type { FilterType } from "@/src/types/report";
import { useRoute, RouteProp } from "@react-navigation/native";
import { CostumerStackRouteProps } from "@/src/routes/CustomerRoutes";

const cardIcons: Record<FilterType, JSX.Element> = {
  lighting: <LightbulbIcon size={26} />,
  garbage: <TrashIcon size={26} />,
  roads: <RoadIcon size={26} />,
  health: <HospitalIcon />,
  security: <PoliceIcon />,
  other: <LightbulbIcon size={26} />,
};

const FILTERS = [
  { label: "Todos" },
  { label: "Lixo" },
  { label: "Vias" },
  { label: "Saúde" },
  { label: "Segurança" },
  { label: "Iluminação" },
];

type ProblemsMapRouteProp = RouteProp<CostumerStackRouteProps, "map">;

export function ProblemsMap() {
  const route = useRoute<ProblemsMapRouteProp>();
  const initialParams = route.params || {};

  const {
    reports,
    loading: reportsLoading,
    error: reportsError,
  } = useAllReports();

  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [bottomHeight, setBottomHeight] = useState(138);
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [hideBottomSheet, setHideBottomSheet] = useState(false);

  // estado interno de foco
  const [focusedReportId, setFocusedReportId] = useState<string | undefined>(
    initialParams.focusedReportId,
  );
  const [focusedLat, setFocusedLat] = useState<number | undefined>(
    initialParams.latitude,
  );
  const [focusedLng, setFocusedLng] = useState<number | undefined>(
    initialParams.longitude,
  );

  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    async function load() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setLocationError("Permissão de localização negada");
          setLoading(false);
          return;
        }
      } catch {
        setLocationError("Erro ao obter localização");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // 🎯 Foca no marker quando focusedReportId / coords mudam
  useEffect(() => {
    if (!focusedReportId || !focusedLat || !focusedLng || loading) return;

    setHideBottomSheet(true);

    const tryAnimate = (attempts = 0) => {
      if (attempts > 20) {
        console.log("❌ Desistiu após 20 tentativas");
        setHideBottomSheet(false);
        return;
      }

      if (mapRef.current) {
        console.log("✅ MapRef pronto! Animando...");

        mapRef.current.animateToRegion(
          {
            latitude: focusedLat,
            longitude: focusedLng,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          },
          1000,
        );
      } else {
        console.log(
          `⏳ Tentativa ${attempts + 1}: MapRef ainda não está pronto...`,
        );
        setTimeout(() => tryAnimate(attempts + 1), 100);
      }
    };

    const timer = setTimeout(() => tryAnimate(), 300);

    return () => clearTimeout(timer);
  }, [focusedReportId, focusedLat, focusedLng, loading]);

  const handleMapPinPress = async () => {
    if (!mapRef.current) return;
    const loc = await Location.getCurrentPositionAsync({});
    mapRef.current.animateCamera(
      {
        center: {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        },
        zoom: 17,
      },
      { duration: 700 },
    );
  };

  // 🎯 Aplica o filtro nos reports
  let filteredData = reports;
  if (selectedFilter !== "Todos") {
    filteredData = reports.filter(
      (item) => item.category.toLowerCase() === selectedFilter.toLowerCase(),
    );
  }

  const isLoading = loading || reportsLoading;
  const displayError = locationError || reportsError;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <Header label="Mapa interativo" leftIcon style={styles.header} />

      <View style={styles.mapContainer}>
        <View style={styles.filterBarTab}>
          <FilterBarItem
            filterSelected={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            filters={FILTERS}
            separated={true}
          />
        </View>

        <Map
          isButton
          problems={filteredData.map((report) => ({
            id: report.id,
            latitude: report.latitude,
            longitude: report.longitude,
            title: report.title || report.description,
            description: report.description,
            filterType: report.filterType,
            address: report.address,
          }))}
          mapRef={mapRef}
          focusedReportId={focusedReportId}
        />

        <TouchableOpacity
          style={[
            styles.mapPinButton,
            { bottom: hideBottomSheet ? 20 : bottomHeight + 16 },
          ]}
          onPress={handleMapPinPress}
          activeOpacity={0.7}
        >
          <MapPinIcon size={36} />
        </TouchableOpacity>

        {hideBottomSheet && (
          <TouchableOpacity
            style={styles.showBottomSheetCustomButton}
            onPress={() => setHideBottomSheet(false)}
            activeOpacity={0.7}
          >
            <View style={styles.customActionCard}>
              <Text style={styles.customActionCardText}> Ver lista</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {!hideBottomSheet && (
        <View
          style={styles.bottomSheet}
          onLayout={(e) => setBottomHeight(e.nativeEvent.layout.height)}
        >
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={color.dark.gray} />
              <Text style={styles.loadingText}>
                {reportsLoading
                  ? "Carregando relatórios..."
                  : "Obtendo sua localização..."}
              </Text>
            </View>
          ) : displayError ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{displayError}</Text>
            </View>
          ) : (
            <FlatList
              data={filteredData}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{
                gap: 20,
                paddingVertical: 20,
              }}
              ListHeaderComponent={
                <View style={styles.bottomSheetHeader}>
                  <Text style={styles.bottomSheetTitle}>
                    Relatórios Próximos
                  </Text>
                  <Text style={styles.bottomSheetCount}>
                    {filteredData.length} encontrado(s)
                  </Text>
                </View>
              }
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>
                    🔭 Nenhum relatório encontrado
                  </Text>
                  {selectedFilter !== "Todos" && (
                    <Text style={styles.emptySubtext}>
                      Tente selecionar outro filtro
                    </Text>
                  )}
                </View>
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setFocusedReportId(item.id);
                    setFocusedLat(item.latitude);
                    setFocusedLng(item.longitude);
                  }}
                >
                  <View style={styles.card}>
                    <View style={styles.cardIconWrapper}>
                      {cardIcons[item.filterType]}
                    </View>
                    <View style={styles.cardInfo}>
                      <Text style={styles.cardTitle}>
                        {item.title || item.description}
                      </Text>
                      <Text style={styles.cardAddress} numberOfLines={2}>
                        {item.description}
                      </Text>
                      <View style={styles.cardProgressContainer}>
                        <Text style={styles.cardProgressText}>
                          {item.progress}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: color.dark.lightGray,
  },
  header: {
    borderBottomWidth: 3,
    borderBottomColor: color.dark.gray,
  },
  mapContainer: { flex: 5 },
  filterBarTab: {
    position: "absolute",
    top: 5,
    left: 0,
    zIndex: 6,
    elevation: 10,
    shadowRadius: 5,
    paddingVertical: 4,
    shadowOpacity: 0.15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
  },
  mapPinButton: {
    zIndex: 5,
    right: 18,
    padding: 15,
    elevation: 8,
    borderWidth: 1,
    borderRadius: 999,
    position: "absolute",
    borderColor: color.dark.gray,
    backgroundColor: color.dark.white,
  },
  showBottomSheetCustomButton: {
    position: "absolute",
    bottom: 18,
    alignSelf: "center",
    zIndex: 10,
  },
  customActionCard: {
    width: 140,
    backgroundColor: color.dark.veryLightGray,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: color.dark.gray,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  customActionCardText: {
    fontSize: 20,
    color: color.dark.darkGray,
    fontWeight: "400",
  },
  bottomSheet: {
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: 138,
    maxHeight: 300,
    borderTopWidth: 3,
    position: "absolute",
    paddingHorizontal: 16,
    borderTopColor: color.dark.gray,
    backgroundColor: color.dark.white,
  },
  bottomSheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  bottomSheetCount: { fontSize: 16 },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "gray",
  },
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: color.dark.darkGray,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 14,
    color: color.dark.darkGray,
    textAlign: "center",
    marginTop: 8,
  },
  card: {
    gap: 20,
    padding: 10,
    borderWidth: 3,
    borderRadius: 8,
    flexDirection: "row",
    borderColor: color.dark.gray,
    backgroundColor: color.dark.veryLightGray,
  },
  cardIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 1000,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.dark.gray,
  },
  cardInfo: {
    flex: 1,
    gap: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  cardAddress: {
    fontSize: 16,
    color: "gray",
  },
  cardProgressContainer: {
    borderRadius: 6,
    marginVertical: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: "flex-start",
    backgroundColor: color.dark.lightGray,
  },
  cardProgressText: {
    fontSize: 14,
  },
});
