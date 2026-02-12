import {
  CameraIcon,
  CheckIcon,
  ClipboardIcon,
  HospitalIcon,
  LightbulbIcon,
  RoadIcon,
  SirenIcon,
  TrashIcon,
  UploadIcon,
} from "@/src/assets/Exports";

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
import { createIssue } from "@/src/services/issues/createIssues";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { Map } from "@/src/components/Map";
import { ArrowLeftIcon } from "@/src/assets/ArrowLeftIcon";

import { uploadImageToStorage } from "@/src/services/issues/uploadImage";

type Step = "stepOne" | "stepTwo" | "stepThree" | "confirmStep";

const CATEGORIES = [
  {
    title: "Iluminação",
    icon: (c: string) => <LightbulbIcon size={24} color={c} />,
  },
  {
    title: "Lixo",
    icon: (c: string) => <TrashIcon size={24} color={c} />,
  },
  {
    title: "Vias",
    icon: (c: string) => <RoadIcon size={24} color={c} />,
  },
  {
    title: "Segurança",
    icon: (c: string) => <SirenIcon size={24} color={c} />,
  },
  {
    title: "Saúde",
    icon: (c: string) => <HospitalIcon size={24} color={c} />,
  },
  {
    title: "Outro",
    icon: (c: string) => <ClipboardIcon size={24} color={c} />,
  },
];

type NavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<CostumerStackRouteProps>,
  BottomTabNavigationProp<CostumerRouteProps>
>;

export function ReportProblem() {
  const [step, setStep] = useState<Step>("stepOne");
  const [selectedCategory, setSelected] = useState<string>("Iluminação");
  const [photo, setPhoto] = useState<string | null>(null);
  const mapRef = useRef<MapView>(null);
  const [clearMapSelection, setClearMapSelection] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  const [protocol, setProtocol] = useState<string | null>(null);

  const [loading, setLoading] = useState<
    "camera" | "gallery" | "submit" | null
  >(null);

  const [inputFocused, setInputFocused] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    console.log("🚀 handleSubmit iniciado");
    console.log("📊 Estado atual:", {
      step,
      loading,
      hasDescription: !!description.trim(),
      hasLocation: !!location,
    });

    if (!description.trim()) {
      console.log("❌ Descrição vazia");
      Alert.alert("Atenção", "Por favor, descreva o problema");
      return;
    }

    if (!location) {
      console.log("❌ Localização não definida");
      Alert.alert("Atenção", "Por favor, selecione a localização no mapa");
      return;
    }

    try {
      console.log("✅ Validações passaram, iniciando submit");
      console.log('⏳ setLoading("submit")');
      setLoading("submit");

      let imageUrl: string | undefined = undefined;
      if (photo) {
        try {
          imageUrl = await uploadImageToStorage(photo);
          console.log("✅ Upload de imagem concluído:", imageUrl);
        } catch (uploadErr) {
          console.log("❌ Falha ao enviar imagem:", uploadErr);
          Alert.alert(
            "Erro ao enviar foto",
            "Tente novamente ou envie sem foto.",
          );
          setLoading(null);
          return;
        }
      } else {
        console.log("ℹ️ Nenhuma foto para upload");
      }

      console.log("📝 Criando issue no Firebase...");
      const issueId = await createIssue({
        category: selectedCategory,
        description,
        imageUrl,
        latitude: location.lat,
        longitude: location.lng,
      });

      console.log("✅ Issue criado com ID:", issueId);

      console.log("💾 setProtocol");
      setProtocol(issueId);

      console.log("🔓 setLoading(null)");
      setLoading(null);

      console.log("📍 Estado antes de mudar step:", { loading, step });
      console.log('➡️ setStep("confirmStep")');
      setStep("confirmStep");
      console.log("✅ Step mudou para confirmStep");
    } catch (e) {
      console.log("❌ Erro capturado:", e);
      Alert.alert("Erro ao enviar", String(e));
      console.log("🔓 setLoading(null) no catch");
      setLoading(null);
    }

    console.log("🏁 handleSubmit finalizado");
  };

  const pickHandler = async (src: "camera" | "gallery") => {
    setLoading(src);
    try {
      const req =
        src === "camera"
          ? await ImagePicker.requestCameraPermissionsAsync()
          : await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (req.status !== "granted") {
        Alert.alert(
          "Permissão negada",
          src === "camera"
            ? "Precisamos de acesso à câmera para tirar fotos"
            : "Precisamos de acesso à galeria para escolher fotos",
        );
      } else {
        const picker =
          src === "camera"
            ? await ImagePicker.launchCameraAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                quality: 1,
              })
            : await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                quality: 1,
              });
        if (!picker.canceled) setPhoto(picker.assets[0].uri);
      }
    } catch {}
    setLoading(null);
  };

  const handleCustomButton = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão negada", "Precisamos de acesso à localização");
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});

      setClearMapSelection(true);
      setTimeout(() => setClearMapSelection(false), 100);

      setLocation({
        lat: currentLocation.coords.latitude,
        lng: currentLocation.coords.longitude,
      });

      setUseCurrentLocation(true);

      mapRef.current?.animateToRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });

      Alert.alert("Sucesso", "Localização atual selecionada");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível obter sua localização");
    }
  };

  const steps = [
    {
      stepText: "Passo 1/3",
      progress: "33%",
      title: "Adicionar Foto",
      content: (
        <View style={{ paddingHorizontal: 24, marginTop: 28, gap: 15 }}>
          <Text style={styles.stepTitle}>Adicionar Foto</Text>
          <View
            style={{
              backgroundColor: color.dark.gray,
              justifyContent: "center",
              alignItems: "center",
              height: 240,
              borderRadius: 12,
              borderWidth: 1.5,
              borderStyle: photo ? "solid" : "dashed",
              borderColor: color.dark.darkGray,
              gap: 10,
              overflow: "hidden",
            }}
          >
            {photo ? (
              <Image
                source={{ uri: photo }}
                style={{ width: "100%", height: "100%", resizeMode: "cover" }}
              />
            ) : (
              <>
                <CameraIcon size={48} color={color.dark.darkGray} />
                <Text style={{ color: color.dark.darkGray }}>
                  [Área de foto]
                </Text>
              </>
            )}
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
              icon={
                loading === "camera" ? (
                  <ActivityIndicator color={color.dark.white} size={24} />
                ) : (
                  <CameraIcon size={24} color={color.dark.white} />
                )
              }
              textStyle={{ fontSize: 14 }}
              onPress={() => pickHandler("camera")}
              disabled={!!loading}
              loading={loading === "camera"}
            />
            <Button
              title="Galeria"
              variant="outlined"
              style={{ height: 50, borderColor: color.dark.darkGray }}
              icon={
                loading === "gallery" ? (
                  <ActivityIndicator color={color.dark.black} size={24} />
                ) : (
                  <UploadIcon size={24} color={color.dark.black} />
                )
              }
              textStyle={{ fontSize: 14, fontWeight: "300" }}
              onPress={() => pickHandler("gallery")}
              disabled={!!loading}
              loading={loading === "gallery"}
            />
          </View>
        </View>
      ),
    },
    {
      stepText: "Passo 2/3",
      progress: "66%",
      title: "Selecionar Categoria",
      content: (
        <View style={{ paddingHorizontal: 24, marginTop: 28, width: "100%" }}>
          <Text style={styles.stepTitle}>Selecionar Categoria</Text>
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
                const selected = item.title === selectedCategory;
                const background = selected
                  ? color.dark.black
                  : color.dark.white;
                const text = selected ? color.dark.white : color.dark.black;
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: background,
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
                    onPress={() => setSelected(item.title)}
                    disabled={!!loading}
                  >
                    {item.icon(text)}
                    <Text style={{ color: text }}>{item.title}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      ),
    },
    {
      stepText: "Passo 3/3",
      progress: "100%",
      title: "Descrição e Localizção",
      content: (
        <View
          style={{ paddingHorizontal: 24, marginTop: 28, gap: 15, flex: 1 }}
        >
          <CustomInput
            textStyle={styles.stepTitle}
            headline="Descrição e Localizção"
            placeholder="Descreva o problema..."
            containerStyle={{
              paddingVertical: 18,
              borderRadius: 12,
              borderWidth: 1,
              justifyContent: "flex-start",
              height: 120,
              borderColor: inputFocused ? color.dark.black : color.dark.gray,
            }}
            onChangeText={setDescription}
            style={{ height: 100 }}
            editable={!loading}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            multiline
          />
          <Text style={styles.stepTitle}>Localização</Text>

          <View
            style={{
              height: 200,
              borderRadius: 12,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: color.dark.darkGray,
            }}
          >
            <Map
              isButton={true}
              mapRef={mapRef}
              onLocationSelect={(coords) => {
                setLocation(coords);
                setUseCurrentLocation(false);
              }}
              clearSelectedLocation={clearMapSelection}
            />
          </View>

          <View style={{ marginTop: 24, alignItems: "center" }}>
            <Button
              title="Usar localização atual"
              onPress={handleCustomButton}
              variant="outlined"
              style={{ borderColor: color.dark.black, width: "100%" }}
              textStyle={{ fontSize: 16 }}
              disabled={!!loading}
            />
          </View>
        </View>
      ),
    },
    {
      stepText: "",
      progress: "0%",
      title: "Confirmação",
      content: (
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
              borderRadius: 35,
              backgroundColor: color.dark.black,
            }}
          >
            <CheckIcon size={36} color={color.dark.white} />
          </View>
          <Text style={{ fontWeight: "300", fontSize: 18 }}>
            Relatório Enviado!
          </Text>
          <Text style={{ fontWeight: "300" }}>
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
            Protocolo: {protocol ? `#${protocol}` : "N/A"}
          </Text>
          <Button
            title="Acompanhar Solicitação"
            textStyle={{ fontSize: 16 }}
            onPress={() => {
              console.log("📊 Botão Acompanhar clicado", { loading });
              navigation.navigate("Tabs", { screen: "Requests" });
            }}
            disabled={!!loading}
          />
          <Button
            title="Voltar ao Início"
            variant="outlined"
            textStyle={{ fontSize: 16 }}
            onPress={() => {
              console.log("🏠 Botão Voltar ao Início clicado", { loading });
              navigation.goBack();
            }}
            disabled={!!loading}
          />
        </View>
      ),
    },
  ];

  const index = ["stepOne", "stepTwo", "stepThree", "confirmStep"].indexOf(
    step,
  );
  const { stepText, progress, content } = steps[index];

  const changeStep = () => {
    if (step === "stepOne" && !photo) {
      Alert.alert("Atenção", "Por favor, adicione uma foto antes de continuar");
      return;
    }

    if (step === "stepThree") {
      if (!description.trim()) {
        Alert.alert("Atenção", "Por favor, descreva o problema");
        return;
      }
      if (!location) {
        Alert.alert("Atenção", "Por favor, selecione a localização no mapa");
        return;
      }
    }

    setStep((step) =>
      step === "stepOne"
        ? "stepTwo"
        : step === "stepTwo"
          ? "stepThree"
          : step === "stepThree"
            ? "confirmStep"
            : step,
    );
  };

  const goBack = () => {
    console.log("⬅️ goBack chamado", { loading, step });
    if (loading) {
      console.log("⚠️ goBack bloqueado por loading");
      return;
    }

    if (step === "stepThree") {
      setClearMapSelection(true);
      setTimeout(() => setClearMapSelection(false), 100);
    }

    setStep((curStep) =>
      curStep === "confirmStep"
        ? "stepThree"
        : curStep === "stepThree"
          ? "stepTwo"
          : curStep === "stepTwo"
            ? "stepOne"
            : (navigation.goBack(), "stepOne"),
    );
  };

  console.log("🎨 Renderizando ReportProblem", { step, loading });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {step !== "confirmStep" && (
          <TouchableOpacity
            onPress={() => {
              console.log("⬅️ Botão voltar clicado", { loading });
              goBack();
            }}
            disabled={!!loading}
          >
            <ArrowLeftIcon />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>
          {step === "confirmStep" ? "Confirmação" : "Reportar Problema"}
        </Text>
        <Text style={styles.headerStep}>{stepText}</Text>
      </View>
      <View style={styles.progressBarWrapper}>
        <View style={[styles.progressBar, { width: progress as any }]} />
      </View>
      {content}
      {step !== "confirmStep" && (
        <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
          <Button
            title="Próximo"
            style={{ paddingHorizontal: 24 }}
            onPress={() => {
              console.log("▶️ Botão Próximo clicado", { step, loading });
              if (step === "stepThree") {
                handleSubmit();
              } else {
                changeStep();
              }
            }}
            disabled={!!loading}
            loading={loading === "submit" && step === "stepThree"}
          />
        </View>
      )}
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
