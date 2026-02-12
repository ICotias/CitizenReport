import { ChevronRightIcon } from "@/src/assets/ChevronRightIcon";
import { color } from "@/src/theme/color";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type ProfileCardProps = {
  icon: React.JSX.Element;
  title: string;
  description: string;
  navigation: () => {};
};

export function ProfileCard({
  icon,
  title,
  description,
  navigation,
}: ProfileCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={navigation}>
      <View style={styles.icon}>{icon}</View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <ChevronRightIcon color={color.dark.darkGray} size={16} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: color.dark.white,
    borderWidth: 1,
    borderColor: color.dark.gray,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 4,
    gap: 10,
  },
  icon: {
    backgroundColor: color.dark.lightGray,
    padding: 12,
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    gap: 6,
    paddingRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000000c1",
  },
  description: {
    fontSize: 12,
    fontWeight: "300",
    color: "#000000c1",
  },
});
