import { GraphicIcon } from "@/src/assets/GraphicIcon";
import { color } from "@/src/theme/color";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type HomeCardProps = {
  title: string;
  description?: string;
  iconType?: "plus" | "map" | "papers" | "graphic";
  onPress?: () => void;
};

const iconMap = {
  plus: <Ionicons name="add-outline" size={32} color={color.light.black} />,
  papers: (
    <Ionicons name="newspaper-outline" size={32} color={color.light.black} />
  ),
  map: <Ionicons name="map-outline" size={32} color={color.light.black} />,
  graphic: <GraphicIcon size={32} />,
};

export function HomeCard({
  title,
  description,
  iconType = "map",
  onPress,
}: HomeCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.circle}>{iconMap[iconType]}</View>
      <Text style={styles.title}>{title}</Text>
      {description ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.light.white,
    borderRadius: 12,
    padding: 4,
    width: "48%",
    height: 140,
    borderWidth: 2.5,
    borderColor: color.light.gray,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: color.light.lightGray,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    color: color.light.black,
  },
  description: {
    fontSize: 12,
    color: color.light.gray,
    textAlign: "center",
    marginTop: 4,
  },
});
