import { color } from "@/src/theme/color";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  label: string;
  clicks: number;
  totalClicks: number;
  onPress: () => void;
};

export function ProgressBarButtom({
  label,
  clicks,
  totalClicks,
  onPress,
}: Props) {
  const percent = totalClicks ? (clicks / totalClicks) * 100 : 0;

  return (
    <View style={{ paddingHorizontal: 8, paddingVertical: 4 }}>
      <TouchableOpacity
        style={{
          borderWidth: 2,
          borderColor: color.dark.gray,
          padding: 12,
          marginBottom: 8,
          borderRadius: 6,
        }}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>{label}</Text>
          <Text style={{ fontSize: 14, color: color.dark.gray, marginTop: 2 }}>
            {percent.toFixed(0)}%
          </Text>
        </View>
        <View
          style={{
            height: 8,
            backgroundColor: color.light.gray,
            borderRadius: 4,
            marginTop: 8,
            overflow: "hidden",
            width: "100%",
          }}
        >
          <View
            style={{
              width: `${percent}%`,
              height: "100%",
              backgroundColor: color.dark.black,
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}
