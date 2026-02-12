import { BellIcon } from "@/src/assets/BellIcon";
import { QuestionIcon } from "@/src/assets/QuestionIcon";
import { UserIcon } from "@/src/assets/UserIcon";
import { WorldIcon } from "@/src/assets/WorldIcon";
import { Button } from "@/src/components/CustomButtom";
import { CustomerScreensHeader } from "@/src/components/CustomerScreensHeader";
import { ProfileCard } from "@/src/components/ProfileCard";
import { color } from "@/src/theme/color";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LeaveIcon } from "@/src/assets/LeaveIcon";
import { useCurrentUser } from "@/src/contexts/currentUser";
import { useUserStats } from "@/src/hooks/useUserState";

const perfilCardMock = [
  {
    icon: <UserIcon color={color.dark.black} />,
    title: "Editar Perfil",
    description: "Alterar foto, nome e informações",
    navigation: () => {},
  },
  {
    icon: <BellIcon color={color.dark.black} />,
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

export function ProfileScreen() {
  const { logout, currentUser } = useCurrentUser();
  const { totalReports, resolvedReports, accountAgeMonths, loading } =
    useUserStats();

  const name = currentUser?.displayName || "Usuário";
  const email = currentUser?.email || "";
  const city = "Feira de Santana";
  const neighborhood = "Centro";

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomerScreensHeader title="Perfil" nav={() => {}} />

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={styles.container}>
          <View style={styles.rowInfo}>
            <View style={styles.profileAvatar}>
              <UserIcon color={color.dark.black} />
            </View>

            <View style={styles.userDetails}>
              <Text style={{ fontSize: 14, fontWeight: "400" }}>{name}</Text>
              <Text style={{ fontSize: 13, fontWeight: "300" }}>{email}</Text>
              <Text style={{ fontSize: 12, fontWeight: "300" }}>
                {city} - {neighborhood}
              </Text>
            </View>
          </View>

          {loading ? (
            <View style={styles.statsContainer}>
              <ActivityIndicator size="small" color={color.dark.black} />
            </View>
          ) : (
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{totalReports}</Text>
                <Text style={styles.statLabel}>Relatórios</Text>
              </View>

              <View style={styles.statItem}>
                <Text style={styles.statValue}>{resolvedReports}</Text>
                <Text style={styles.statLabel}>Resolvidos</Text>
              </View>

              <View style={styles.statItem}>
                <Text style={styles.statValue}>{accountAgeMonths}</Text>
                <Text style={styles.statLabel}>Meses</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.cardsContainer}>
          {perfilCardMock.map((item, index) => (
            <ProfileCard
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
          <Button
            icon={<LeaveIcon size={20} color={color.dark.white} />}
            title="Sair da Conta"
            style={{ borderColor: color.dark.gray, marginTop: 12 }}
            textStyle={{ fontSize: 14, fontWeight: "500" }}
            onPress={logout}
          />
        </View>
      </ScrollView>
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
  statValue: {
    fontSize: 20,
    fontWeight: "600",
    color: color.dark.black,
  },
  statLabel: {
    fontWeight: "300",
    fontSize: 12,
    color: color.dark.gray,
  },
  cardsContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
});
