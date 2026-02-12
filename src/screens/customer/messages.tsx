import { BellIcon } from "@/src/assets/BellIcon";
import { CustomerScreensHeader } from "@/src/components/CustomerScreensHeader";
import { MessageCard, MessageTypeProps } from "@/src/components/MessageCard";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function MessagesScreen() {
  const mockMessages = [
    {
      id: "#123213",
      description:
        "Seu relatório sobre a iluminação pública foi resolvido. Obrigado por contribuir!",
      date: "21/02/2011",
      time: "09:10",
      type: "ReportNotification",
    },
    {
      id: "#234233",
      description:
        "Seu relatório sobre o saneamento público foi resolvido. Obrigado por contribuir!",
      date: "21/02/2011",
      time: "09:10",
      type: "AtualizationNotification",
    },
    {
      id: "#234554",
      description:
        "Seu relatório sobre o saneamento público foi resolvido. Obrigado por contribuir!",
      date: "21/02/2011",
      time: "09:10",
      type: "NewNotification",
    },
    {
      id: "#233455",
      description:
        "Seu relatório sobre o saneamento público foi resolvido. Obrigado por contribuir!",
      date: "21/02/2011",
      time: "09:10",
      type: "FeedBackNotification",
    },
  ];
  return (
    <SafeAreaView>
      <CustomerScreensHeader
        nav={() => {}}
        title="Mensagens"
        icon={<BellIcon />}
      />
      <View>
        <FlatList
          data={mockMessages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MessageCard
              date={item.date}
              description={item.description}
              id={item.id}
              time={item.time}
              key={item.id}
              type={item.type as MessageTypeProps}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
