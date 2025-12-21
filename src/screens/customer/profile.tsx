import { Bell } from "@/src/assets/Bell";
import { QuestionIcon } from "@/src/assets/QuestionIcon";
import { User } from "@/src/assets/User";
import { WorldIcon } from "@/src/assets/WorldIcon";
import { Button } from "@/src/components/CustomButtom";

import { CustomerScreensHeader } from "@/src/components/CustomerScreensHeader";
import { PerfilCard } from "@/src/components/PerfilCard";
import { color } from "@/src/theme/color";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CostumerRouteProps } from "@/src/routes/CustomerRoutes";

const perfilCardMock = [
  {
    icon: <User color={color.dark.black} />,
    title: "Editar Perfil",
    description: "Alterar foto, nome e informações",
    navigation: () => {},
  },
  {
    icon: <Bell color={color.dark.black} />,
    title: "Configurações de Notificação",
    description: "Veja ou edite dados da sua conta",
    navigation: () => {},
  },
  {
    icon: <WorldIcon color={color.dark.black} />,
    title: "Idioma",
    description: "Alterar idioma",
    navigation: () => {},
  },
  {
    icon: <QuestionIcon color={color.dark.black} />,
    title: "Ajuda e Suporte",
    description: "FAQ e contato com suporte",
    navigation: () => {},
  },
];

type ProfileScreenProps = BottomTabScreenProps<CostumerRouteProps, "Profile">;

export function ProfileScreen({ route }: ProfileScreenProps) {
  const { name, email, city, neighborhood, reports, resolvedReports, months } =
    route.params;

  return (
    <SafeAreaView>
      <CustomerScreensHeader title="Perfil" nav={() => {}} />

      <View style={styles.container}>
        <View style={styles.rowInfo}>
          <View style={styles.profileAvatar}>
            <User color={color.dark.black} />
          </View>

          <View style={styles.userDetails}>
            <Text style={{ fontSize: 14, fontWeight: "400" }}>{name}</Text>
            <Text style={{ fontSize: 13, fontWeight: "300" }}>{email}</Text>
            <Text style={{ fontSize: 12, fontWeight: "300" }}>
              {city} - {neighborhood}
            </Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text>{reports}</Text>
            <Text style={styles.statLabel}>Relatórios</Text>
          </View>

          <View style={styles.statItem}>
            <Text>{resolvedReports}</Text>
            <Text style={styles.statLabel}>Resolvidos</Text>
          </View>

          <View style={styles.statItem}>
            <Text>{months}</Text>
            <Text style={styles.statLabel}>Meses</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardsContainer}>
        {perfilCardMock.map((item, index) => (
          <PerfilCard
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
            navigation={() => item.navigation}
          />
        ))}

        <Button
          title="Contatar a Prefeitura"
          variant="outlined"
          style={{ borderColor: color.dark.gray, marginTop: 36 }}
          textStyle={{ fontSize: 14, fontWeight: "300" }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 2,
    borderColor: color.dark.gray,
    padding: 24,
    gap: 14,
    backgroundColor: color.dark.white,
  },
  rowInfo: {
    flexDirection: "row",
    gap: 14,
  },
  profileAvatar: {
    backgroundColor: color.dark.gray,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  userDetails: {
    gap: 10,
  },
  statsContainer: {
    borderTopWidth: 1,
    borderColor: color.dark.gray,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 12,
  },
  statItem: {
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  statLabel: {
    fontWeight: "300",
  },
  cardsContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
});
