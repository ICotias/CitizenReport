import { color } from "@/src/theme/color";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

type RecentActivityCardProps = {
  title: string;
  description?: string;
  inProgress: boolean;
  photoUrl?: string;
};

export function RecentActivityCard({
  title,
  description,
  inProgress,
  photoUrl,
}: RecentActivityCardProps) {
  const [imageError, setImageError] = useState(false);

  const hasValidPhoto = photoUrl && photoUrl.trim() !== "" && !imageError;

  return (
    <TouchableOpacity style={styles.card}>
      {hasValidPhoto ? (
        <Image
          source={{ uri: photoUrl }}
          style={styles.image}
          resizeMode="cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>📷</Text>
        </View>
      )}

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>

        {description ? (
          <Text style={styles.description}>{description}</Text>
        ) : null}

        {inProgress ? (
          <Text style={styles.description}>Em andamento</Text>
        ) : null}
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
  contentContainer: {
    flex: 1,
    alignItems: "flex-start",
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
  image: {
    height: 60,
    width: 60,
    borderRadius: 8,
    backgroundColor: color.light.gray,
  },
  placeholderImage: {
    backgroundColor: color.light.gray,
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  placeholderText: {
    fontSize: 24,
  },
});
