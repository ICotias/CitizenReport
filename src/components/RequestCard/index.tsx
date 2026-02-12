import { ChevronRightIcon } from "@/src/assets/ChevronRightIcon";
import { color } from "@/src/theme/color";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

export type progressFilterProps = "Pendente" | "Em Progresso" | "Resolvido";

type Props = {
  image?: string;
  id: string;
  description: string;
  date: string;
  type: string;
  progress: progressFilterProps;
  onPress?: () => void; // Nova prop para navegação
};

function getContainerProgressColor(progress: progressFilterProps) {
  switch (progress) {
    case "Pendente":
      return { backgroundColor: color.dark.lightGray };
    case "Em Progresso":
      return { backgroundColor: color.dark.gray };
    case "Resolvido":
      return { backgroundColor: color.dark.black };
    default:
      return { backgroundColor: color.dark.gray };
  }
}

function getContainerProgressTextColor(progress: progressFilterProps) {
  switch (progress) {
    case "Resolvido":
      return { color: color.dark.white };
    default:
      return { color: color.dark.black };
  }
}

export function RequestCard({
  image,
  id,
  description,
  date,
  type,
  progress,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.photoContainer}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={styles.photoImage}
            resizeMode="cover"
          />
        ) : (
          <Text style={styles.photoText}>Sem foto</Text>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.id}>{id}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text>
          {date} • {type}
        </Text>
        <View
          style={[styles.statusContainer, getContainerProgressColor(progress)]}
        >
          <Text style={getContainerProgressTextColor(progress)}>
            {progress}
          </Text>
        </View>
      </View>
      <ChevronRightIcon color={color.dark.darkGray} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: color.dark.gray,
    backgroundColor: color.dark.white,
    gap: 20,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderRadius: 12,
  },
  photoContainer: {
    height: 70,
    width: 70,
    backgroundColor: color.dark.gray,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  photoImage: {
    height: 70,
    width: 70,
    borderRadius: 12,
  },
  photoText: {
    color: "white",
    textAlign: "center",
  },
  infoContainer: {
    gap: 6,
    justifyContent: "center",
  },
  statusContainer: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  id: {
    fontSize: 18,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    width: 180,
  },
});
