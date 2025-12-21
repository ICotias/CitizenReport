import { color } from "@/src/theme/color";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type RecentActivityCardProps = {
  title: string;
  description?: string;
  inProgress: boolean;
};

export function RecentActivityCard({
  title,
  description,
  inProgress,
}: RecentActivityCardProps) {
  return (
    <TouchableOpacity style={styles.card}>
      <View
        style={{
          backgroundColor: color.light.gray,
          height: 60,
          width: 60,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
        }}
      />

      <View style={{ flex: 1, alignItems: "flex-start" }}>
        <Text style={styles.title}>{title}</Text>

        {description ? (
          <Text style={styles.description}>{description}</Text>
        ) : null}

        {inProgress ? <Text style={styles.description}>Olá</Text> : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.light.white,
    borderRadius: 12,
    height: 100,
    flex: 1,
    borderWidth: 2.5,
    borderColor: color.light.gray,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 24,
    marginHorizontal: 24,
    gap: 20,
  },
  title: {
    fontSize: 16,
    color: color.light.black,
    textAlign: "left",
  },
  description: {
    fontSize: 12,
    textAlign: "left",
    color: color.light.gray,
    marginTop: 4,
  },
});
