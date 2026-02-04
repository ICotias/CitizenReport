import { ArrowLeft } from "@/src/assets/ArrowLeft";
import { CameraIcon } from "@/src/assets/CameraIcon";
import { CheckIcon } from "@/src/assets/CheckIcon";
import { ClipboardIcon } from "@/src/assets/ClipboardIcon";
import { Hospital } from "@/src/assets/Hospital";
import { Lightbulb } from "@/src/assets/Lightbulb";
import { MapPinIcon } from "@/src/assets/MapPin";
import { Road } from "@/src/assets/Road";
import { SirenIcon } from "@/src/assets/SirenIcon";
import { Trash } from "@/src/assets/Trash";
import { Upload } from "@/src/assets/Upload";
import { Button } from "@/src/components/CustomButtom";
import { CustomInput } from "@/src/components/CustomInput";
import {
  CostumerRouteProps,
  CostumerStackRouteProps,
} from "@/src/routes/CustomerRoutes";
import { color } from "@/src/theme/color";
import { typography } from "@/src/theme/typography";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type stepProps = "stepOne" | "stepTwo" | "stepThree" | "confirmStep";

export function ReportProblem() {
  const [whichPage, setWhichPage] = useState<stepProps>("stepOne");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "Iluminação"
  );

  const CATEGORIES = [
    {
      title: "Iluminação",
      icon: (colorProp: string) => <Lightbulb size={24} color={colorProp} />,
    },
    {
      title: "Lixo",
      icon: (colorProp: string) => <Trash size={24} color={colorProp} />,
    },
    {
      title: "Vias",
      icon: (colorProp: string) => <Road size={24} color={colorProp} />,
    },
    {
      title: "Segurança",
      icon: (colorProp: string) => <SirenIcon size={24} color={colorProp} />,
    },
    {
      title: "Saúde",
      icon: (colorProp: string) => <Hospital size={24} color={colorProp} />,
    },
    {
      title: "Outro",
      icon: (colorProp: string) => (
        <ClipboardIcon size={24} color={colorProp} />
      ),
    },
  ];

  type NavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<CostumerStackRouteProps>,
    BottomTabNavigationProp<CostumerRouteProps>
  >;
  const navigation = useNavigation<NavigationProp>();

  function getProgressBarStep() {
    switch (whichPage) {
      case "stepOne":
        return {
          stepText: "Passo 1/3",
          progress: "33%",
          stepTitle: "Adicionar Foto",
        };
      case "stepTwo":
        return {
          stepText: "Passo 2/3",
          progress: "66%",
          stepTitle: "Selecionar Categoria",
        };
      case "stepThree":
        return {
          stepText: "Passo 3/3",
          progress: "100%",
          stepTitle: "Descrição e Localizção",
        };
      case "confirmStep":
        return {
          stepText: "",
          progress: "0%",
          stepTitle: "Descrição e Localizção",
        };
      default:
        return { stepText: "", progress: "0%", stepTitle: "" };
    }
  }

  function changeState() {
    if (whichPage === "stepOne") {
      setWhichPage("stepTwo");
    } else if (whichPage === "stepTwo") {
      setWhichPage("stepThree");
    } else if (whichPage === "stepThree") {
      setWhichPage("confirmStep");
    }
  }
  function goBackState() {
    if (whichPage === "confirmStep") {
      setWhichPage("stepThree");
    } else if (whichPage === "stepThree") {
      setWhichPage("stepTwo");
    } else if (whichPage === "stepTwo") {
      setWhichPage("stepOne");
    } else if (whichPage === "stepOne") {
      navigation.goBack();
    }
  }

  function getStepScreen() {
    const { stepTitle } = getProgressBarStep();

    switch (whichPage) {
      case "stepOne":
        return (
          <View style={{ paddingHorizontal: 24, marginTop: 28, gap: 15 }}>
            <Text style={styles.stepTitle}>{stepTitle}</Text>
            <View
              style={{
                backgroundColor: color.dark.gray,
                justifyContent: "center",
                alignItems: "center",
                height: 240,
                borderRadius: 12,
                borderWidth: 1.5,
                borderStyle: "dashed",
                borderColor: color.dark.darkGray,
                gap: 10,
              }}
            >
              <CameraIcon size={48} color={color.dark.darkGray} />
              <Text style={{ color: color.dark.darkGray }}>[Área de foto]</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignSelf: "center",
                width: "48.5%",
                gap: 10,
              }}
            >
              <Button
                title="Tirar Foto"
                style={{ height: 50 }}
                icon={<CameraIcon size={24} color={color.dark.white} />}
                textStyle={{ fontSize: 14 }}
              />
              <Button
                title="Galeria"
                variant="outlined"
                style={{ height: 50, borderColor: color.dark.darkGray }}
                icon={<Upload size={24} color={color.dark.black} />}
                textStyle={{ fontSize: 14, fontWeight: "300" }}
              />
            </View>
          </View>
        );
      case "stepTwo":
        return (
          <View
            style={{
              paddingHorizontal: 24,
              marginTop: 28,
              width: "100%",
            }}
          >
            <Text style={styles.stepTitle}>{stepTitle}</Text>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 12,
                width: "100%",
              }}
            >
              <FlatList
                data={CATEGORIES}
                keyExtractor={(item) => item.title}
                numColumns={2}
                columnWrapperStyle={{ gap: 12 }}
                renderItem={({ item }) => {
                  const isItemSelected = item.title === selectedCategory;
                  const iconColor = selectedCategory
                    ? isItemSelected
                      ? color.dark.white
                      : color.dark.black
                    : color.dark.black;
                  return (
                    <TouchableOpacity
                      style={{
                        backgroundColor: selectedCategory
                          ? isItemSelected
                            ? color.dark.black
                            : color.dark.white
                          : color.dark.white,
                        width: 166,
                        height: 60,
                        borderRadius: 14,
                        borderWidth: 1.5,
                        borderColor: color.dark.gray,
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 10,
                        flexDirection: "row",
                        gap: 10,
                      }}
                      onPress={() => setSelectedCategory(item.title)}
                    >
                      {item.icon(iconColor)}
                      <Text
                        style={{
                          color: selectedCategory
                            ? isItemSelected
                              ? color.dark.white
                              : color.dark.black
                            : color.dark.white,
                        }}
                      >
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        );
      case "stepThree":
        return (
          <View style={{ paddingHorizontal: 24, marginTop: 28, gap: 15 }}>
            <CustomInput
              textStyle={styles.stepTitle}
              headline={stepTitle}
              placeholder="Descreva o problema..."
              containerStyle={{
                backgroundColor: color.dark.white,
                paddingHorizontal: 18,
                paddingVertical: 18,
                height: 120,
                borderRadius: 12,
                borderWidth: 1,
                justifyContent: "flex-start",
              }}
            />
            <Text style={styles.stepTitle}>Localização</Text>
            <View
              style={{
                backgroundColor: color.dark.gray,
                justifyContent: "center",
                alignItems: "center",
                height: 180,
                borderRadius: 12,
                gap: 10,
                borderWidth: 1,
                borderColor: color.dark.darkGray,
              }}
            >
              <Text style={{ color: color.dark.darkGray }}>
                [Mapa para selecionar local]
              </Text>
            </View>
            <Button
              icon={<MapPinIcon size={22} />}
              title="Usar Minha Localização Atual"
              variant="outlined"
              textStyle={{ fontSize: 16, fontWeight: "400" }}
              style={{ borderColor: color.dark.darkGray }}
            />
          </View>
        );
      case "confirmStep":
        return (
          <View
            style={{
              paddingHorizontal: 24,
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              gap: 10,
            }}
          >
            <View
              style={{
                height: 70,
                width: 70,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "100%",
                backgroundColor: color.dark.black,
              }}
            >
              <CheckIcon size={36} color={color.dark.white} />
            </View>
            <Text
              style={{
                fontWeight: "300",
                fontSize: 18,
              }}
            >
              Relatório Enviado!
            </Text>
            <Text
              style={{
                fontWeight: "300",
              }}
            >
              Seu relatório foi recebido com sucesso.
            </Text>
            <Text
              style={{
                backgroundColor: color.dark.gray,
                padding: 14,
                borderRadius: 12,
                fontWeight: "300",
              }}
            >
              Protocolo: #12345
            </Text>
            <Button
              title="Acompanhar Solicitação"
              textStyle={{ fontSize: 16 }}
              onPress={() =>
                navigation.navigate("Tabs", { screen: "Requests" })
              }
            />
            <Button
              title="Voltar ao Início"
              variant="outlined"
              textStyle={{ fontSize: 16 }}
              onPress={() => navigation.goBack()}
            />
          </View>
        );
      default:
        return null;
    }
  }

  const { stepText, progress } = getProgressBarStep();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBackState}>
          <ArrowLeft />
        </TouchableOpacity>
        {whichPage === "confirmStep" ? (
          <Text style={styles.headerTitle}>Confirmação</Text>
        ) : (
          <Text style={styles.headerTitle}>Reportar Problema</Text>
        )}
        <Text style={styles.headerStep}>{stepText}</Text>
      </View>
      <View style={styles.progressBarWrapper}>
        {/* @ts-ignore */}
        <View style={[styles.progressBar, { width: progress }]} />
      </View>
      {getStepScreen()}
      <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
        {whichPage !== "confirmStep" ? (
          <Button
            title="Próximo"
            style={{ paddingHorizontal: 24 }}
            onPress={changeState}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.light.lightGray,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    borderBottomWidth: 3,
    borderColor: color.dark.gray,
    paddingBottom: 12,
    gap: 10,
  },
  headerTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: "400",
  },
  headerStep: {
    fontSize: typography.body.fontSize,
    color: color.dark.darkGray,
    fontWeight: "300",
    marginLeft: "30%",
  },
  progressBarWrapper: {
    height: 8,
    width: "100%",
    backgroundColor: color.dark.lightGray,
  },
  progressBar: {
    height: 8,
    backgroundColor: color.dark.black,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: "300",
    marginBottom: 5,
    color: color.dark.black,
  },
});
