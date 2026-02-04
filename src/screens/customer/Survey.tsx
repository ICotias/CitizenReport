import { ArrowLeft } from "@/src/assets/ArrowLeft";
import { Graphic } from "@/src/assets/Graphic";
import { CustomerScreensHeader } from "@/src/components/CustomerScreensHeader";
import { Header } from "@/src/components/Header";
import { SurveyCard } from "@/src/components/SurveyCard";
import { color } from "@/src/theme/color";
import { typography } from "@/src/theme/typography";
import { useNavigation } from "@react-navigation/native";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function SurveyScreen() {
  const surveys = [
    {
      title: "Nova Ciclovia na Av. Paulista",
      type: "Mobilidade",
      description: "Você apoia a construção de uma nova ciclovia?",
      end: "Encerra em 3 dias",
      buttons: [
        "Sim, totalmente a favor",
        "Não, prefiro outras prioridades",
        "Indiferente",
      ],
    },
    {
      title: "Horário de funcionamento das praças",
      type: "Lazer",
      description: "Qual horário de fechamento você prefere?",
      end: "Encerra em 5 dias",
      buttons: ["20:00", "22:00", "00:00"],
    },
  ];
  return (
    <SafeAreaView>
      <Header label="Enquetes Públicas" leftIcon />
      <View
        style={{
          backgroundColor: color.dark.black,
          flexDirection: "row",
          width: "100%",
          height: 120,
          paddingVertical: 32,
          paddingHorizontal: 8,
        }}
      >
        <View
          style={{
            paddingHorizontal: 12,
            width: "100%",
            flexDirection: "row",
          }}
        >
          <Graphic size={36} color={color.dark.white} />
          <View
            style={{
              paddingHorizontal: 24,
              gap: 8,
            }}
          >
            <Text
              style={{
                color: color.dark.white,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Participe das decisões
            </Text>
            <Text
              style={{
                color: color.dark.white,
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              Sua opinião ajuda a prefeitura a tomar decisões mais alinhadas com
              as necessidades da comunidade.
            </Text>
          </View>
        </View>
      </View>
      <View>
        <FlatList
          ListHeaderComponent={
            <Text style={{ fontSize: typography.h2.fontSize }}>
              Enquetes ativas ({surveys.length})
            </Text>
          }
          contentContainerStyle={{
            paddingHorizontal: 24,
            marginVertical: 24,
            paddingBottom: 340,
          }}
          renderItem={({ item }) => (
            <SurveyCard
              title={item.title}
              type={item.type}
              description={item.description}
              end={item.end}
              button={item.buttons}
            />
          )}
          data={surveys}
          key={surveys.length}
        />
      </View>
    </SafeAreaView>
  );
}
