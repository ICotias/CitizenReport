import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import MapView from "react-native-maps";
import { Road } from "@/src/assets/Road";
import * as Location from "expo-location";
import { color } from "@/src/theme/color";
import { Trash } from "@/src/assets/Trash";
import { Map } from "@/src/components/Map";
import { Header } from "@/src/components/Header";
import { MapPinIcon } from "@/src/assets/MapPin";
import { Lightbulb } from "@/src/assets/Lightbulb";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FilterBarItem } from "@/src/components/FilterBarItem";
import { Hospital } from "@/src/assets/Hospital";
import { PoliceIcon } from "@/src/assets/PoliceIcon";

const cardIcons = {
  lighting: <Lightbulb size={26} />,
  garbage: <Trash size={26} />,
  roads: <Road size={26} />,
  health: <Hospital />,
  security: <PoliceIcon />,
};

export type cardIconsProps = keyof typeof cardIcons;

type dataProps = {
  id: string;
  type: string;
  filterType: cardIconsProps;
  title: string;
  latitude: number;
  longitude: number;
  address: string;
  progress: string;
};

const FILTERS = [
  { label: "Todos" },
  { label: "Lixo" },
  { label: "Vias" },
  { label: "Saúde" },
  { label: "Segurança" },
  { label: "Iluminação" },
];

const initialData: dataProps[] = [
  {
    id: "1",
    type: "Iluminação",
    filterType: "lighting",
    title: "Poste sem iluminação",
    latitude: -12.2504425,
    longitude: -38.9543919,
    address: "Av. Maria Quitéria, 1931, Centro, Feira de Santana - BA",
    progress: "Em progresso",
  },
  {
    id: "2",
    type: "lixo",
    filterType: "garbage",
    title: "Acúmulo de lixo",
    latitude: -12.2469425,
    longitude: -38.9528919,
    address: "Av. Maria Quitéria, 1880, Centro, Feira de Santana - BA",
    progress: "Em progresso",
  },

  {
    id: "3",
    type: "Vias",
    filterType: "roads",
    title: "Buraco na via",
    latitude: -12.2489425,
    longitude: -38.9528919,
    address: "Av. Maria Quitéria, 1880, Centro, Feira de Santana - BA",
    progress: "Em progresso",
  },

  {
    id: "4",
    type: "Saúde",
    filterType: "health",
    title: "Buraco na via",
    latitude: -12.2519425,
    longitude: -38.9508919,
    address:
      "Av. Maria Quitéria, próximo ao Sandys Empresarial, São João, Feira de Santana - BA",
    progress: "Em progresso",
  },
  {
    id: "5",
    type: "Segurança",
    filterType: "security",
    title: "Buraco na via",
    latitude: -12.2519425,
    longitude: -38.9558019,
    address:
      "Av. Maria Quitéria, próximo ao Sandys Empresarial, São João, Feira de Santana - BA",
    progress: "Em progresso",
  },
];

export function ProblemsMap() {
  const [data, setData] = useState<dataProps[]>(initialData);

  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [bottomHeight, setBottomHeight] = useState(138);
  const [selectedFilter, setSelectedFilter] = useState("Todos");

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

  let filteredData = data;
  if (selectedFilter !== "Todos") {
    filteredData = data.filter(
      (item) =>
        item.type.toLocaleLowerCase() === selectedFilter.toLocaleLowerCase(),
    );
  }

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

        <Map isButton problems={filteredData} mapRef={mapRef} />

        <TouchableOpacity
          style={[styles.mapPinButton, { bottom: bottomHeight + 16 }]}
          onPress={handleMapPinPress}
          activeOpacity={0.7}
        >
          <MapPinIcon size={36} />
        </TouchableOpacity>
      </View>

      <View
        style={styles.bottomSheet}
        onLayout={(e) => setBottomHeight(e.nativeEvent.layout.height)}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={color.dark.gray} />
            <Text style={styles.loadingText}>Obtendo sua localização...</Text>
          </View>
        ) : locationError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{locationError}</Text>
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
                <Text style={styles.bottomSheetTitle}>Relatórios Próximos</Text>
                <Text style={styles.bottomSheetCount}>
                  {filteredData.length} encontrado(s)
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardIconWrapper}>
                  {cardIcons[item.filterType]}
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardAddress}>{item.address}</Text>
                  <View style={styles.cardProgressContainer}>
                    <Text>{item.progress}</Text>
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>
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

  errorText: { color: "red" },

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
    padding: 2,
    maxWidth: 110,
    borderRadius: 4,
    marginVertical: 5,
    backgroundColor: color.dark.lightGray,
  },
});
