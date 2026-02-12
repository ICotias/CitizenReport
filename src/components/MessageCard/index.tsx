import { BellIcon } from "@/src/assets/BellIcon";
import { ChevronRightIcon } from "@/src/assets/ChevronRightIcon";
import { PointIcon } from "@/src/assets/PointIcon";
import { color } from "@/src/theme/color";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type MessageTypeProps =
  | "ReportNotification"
  | "AtualizationNotification"
  | "NewNotification"
  | "FeedBackNotification";

export type MessageCardProps = {
  id: string;
  description: string;
  date: string;
  time: string;
  type: MessageTypeProps;
};

export function MessageCard({
  id,
  description,
  date,
  time,
  type,
}: MessageCardProps) {
  function getTypeOfMessage(type: MessageTypeProps) {
    switch (type) {
      case "ReportNotification":
        return (
          <Text style={[styles.id, { fontWeight: "500" }]}>
            Relatório {id} foi resolvido
          </Text>
        );
      case "AtualizationNotification":
        return (
          <Text style={[styles.id, { fontWeight: "500" }]}>
            Atualização: Relatório {id}
          </Text>
        );
      case "NewNotification":
        return (
          <Text style={[styles.id, { fontWeight: "300" }]}>
            Nova mensagem da prefeitura
          </Text>
        );
      case "FeedBackNotification":
        return (
          <Text style={[styles.id, { fontWeight: "300" }]}>
            Seu feedback é importante {id}
          </Text>
        );
      default:
        return null;
    }
  }
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor:
            type === "ReportNotification" || type === "AtualizationNotification"
              ? color.dark.white
              : color.dark.lightGray,
        },
      ]}
    >
      <View
        style={[
          {
            borderRadius: "100%",
            height: 50,
            width: 50,
            justifyContent: "center",
            alignItems: "center",
          },
          {
            backgroundColor:
              type === "ReportNotification" ||
              type === "AtualizationNotification"
                ? color.dark.black
                : color.dark.gray,
          },
        ]}
      >
        <BellIcon
          size={22}
          color={
            type === "ReportNotification" || type === "AtualizationNotification"
              ? color.dark.white
              : color.dark.black
          }
        />
      </View>
      <View style={styles.infoContainer}>
        {getTypeOfMessage(type)}

        <Text style={styles.description}>{description}</Text>

        <Text style={{ fontSize: 12, color: color.dark.darkGray }}>
          {date} • {time}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
        }}
      >
        <ChevronRightIcon color={color.dark.darkGray} size={16} />
        {type === "ReportNotification" ||
        type === "AtualizationNotification" ? (
          <PointIcon size={16} style={{ marginTop: 10, marginLeft: 15 }} />
        ) : (
          <PointIcon
            size={16}
            style={{ marginTop: 10, marginLeft: 15 }}
            color={color.dark.lightGray}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1.5,
    borderColor: "#818181",
    backgroundColor: color.dark.white,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 12,
  },
  infoContainer: {
    justifyContent: "center",
    gap: 10,
    paddingBottom: 12,
    width: "55%",
  },
  id: {
    fontSize: 14,
  },
  description: {
    fontSize: 14,
    width: 180,
    color: "#000000c1",
  },
});
