import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { Lightbulb } from "@/src/assets/Lightbulb";
import { Trash } from "@/src/assets/Trash";
import { Road } from "@/src/assets/Road";
import { color } from "@/src/theme/color";
import { MapPinIcon } from "@/src/assets/MapPin";
import { Hospital } from "@/src/assets/Hospital";
import { PoliceIcon } from "@/src/assets/PoliceIcon";

type Problem = {
  id: string | number;
  latitude: number;
  longitude: number;
  title: string;
  description?: string;
  filterType: string;
  address?: string;
};

type Props = {
  isButton?: boolean;
  problems?: Problem[];
  showMapPinButton?: boolean;
  mapRef?: React.RefObject<MapView | null>;
  onMapPinPress?: () => Promise<void>;
};

export function Map({
  isButton = false,
  showMapPinButton = false,
  onMapPinPress,
  problems = [],
  mapRef,
}: Props) {
  const [location, setLocation] = useState<Region | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão negada", "Precisamos de acesso à localização");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
    })();
  }, []);

  const getMarkerIcon = (type: string) => {
    const iconSize = 32;

    switch (type) {
      case "lighting":
      case "iluminacao":
        return (
          <View style={styles.markerContainer}>
            <Lightbulb size={iconSize} color={color.dark.black} />
          </View>
        );
      case "garbage":
      case "lixo":
        return (
          <View style={styles.markerContainer}>
            <Trash size={iconSize} color={color.dark.black} />
          </View>
        );
      case "roads":
      case "buraco":
        return (
          <View style={styles.markerContainer}>
            <Road size={iconSize} color={color.dark.black} />
          </View>
        );
      case "health":
      case "saude":
        return (
          <View style={styles.markerContainer}>
            <Hospital size={iconSize} color={color.dark.black} />
          </View>
        );
      case "security":
      case "seguranca":
        return (
          <View style={styles.markerContainer}>
            <PoliceIcon size={iconSize} color={color.dark.black} />
          </View>
        );
      default:
        return (
          <View
            style={[
              styles.markerContainer,
              { backgroundColor: color.dark.lightGray },
            ]}
          >
            <View style={styles.defaultMarker} />
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={location}
          showsUserLocation
          showsMyLocationButton
          scrollEnabled={isButton}
          zoomEnabled={isButton}
          rotateEnabled={isButton}
          pitchEnabled={isButton}
        >
          <Marker coordinate={location} title="Você está aqui">
            <View style={styles.userMarker}>
              <View style={styles.userMarkerInner} />
            </View>
          </Marker>

          {problems.map((problem) => (
            <Marker
              key={problem.id}
              coordinate={{
                latitude: problem.latitude,
                longitude: problem.longitude,
              }}
              title={problem.title}
              description={
                problem.address
                  ? `${problem.address}${problem.description ? " - " + problem.description : ""}`
                  : problem.description
              }
            >
              {getMarkerIcon(problem.filterType)}
            </Marker>
          ))}
        </MapView>
      )}

      <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
        {showMapPinButton && (
          <TouchableOpacity
            style={[styles.mapPinButtonOverlay, styles.mapPinButtonPosition]}
            onPress={() => {
              console.log("BOTÃO CLICADO");
              onMapPinPress?.();
            }}
            activeOpacity={0.6}
          >
            <MapPinIcon size={36} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  map: {
    flex: 1,
    borderRadius: 10,
  },

  userMarker: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderRadius: 15,
    alignItems: "center",
    borderColor: "white",
    justifyContent: "center",
    backgroundColor: "rgba(0,122,255,0.3)",
  },
  userMarkerInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#007AFF",
  },

  markerContainer: {
    width: 44,
    height: 44,
    borderRadius: 1000,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.dark.gray,
  },
  defaultMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFF",
  },

  mapPinButtonOverlay: {
    position: "absolute",
    padding: 15,
    borderWidth: 1,
    borderRadius: 250,
    backgroundColor: color.dark.white,
    borderColor: color.dark.gray,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  mapPinButtonPosition: {
    right: 18,
    bottom: 120,
  },
});
