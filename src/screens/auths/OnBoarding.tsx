import { useState, useRef } from "react";
import { color } from "@/src/theme/color";
import { Header } from "@/src/components/Header";
import { Spacer } from "@/src/components/Spacer";
import { Button } from "@/src/components/CustomButtom";
import { SwitchPage } from "@/src/components/SwitchPage";
import { AuthRouteProps } from "@/src/routes/AuthRoutes";
import { authService } from "@/src/services/auth/authServices";
import { CustomInput } from "@/src/components/CustomInput";
import { useCurrentUser } from "@/src/contexts/currentUser";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ActivityIndicator, Alert, View, TextInput } from "react-native";

type OnBoardingRouteProp = RouteProp<AuthRouteProps, "OnBoarding">;

export function OnBoarding() {
  const { params } = useRoute<OnBoardingRouteProp>();
  const { login } = useCurrentUser();

  const [wichPage, setWichPage] = useState<"login" | "register">(
    params?.page ?? "login",
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerCPF, setRegisterCPF] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!loginEmail || !loginPassword) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    setLoading(true);
    const result = await authService.signIn(loginEmail, loginPassword);
    setLoading(false);

    if (result.success) {
      // login(); <-- REMOVIDO conforme instrução
    } else {
      Alert.alert("Erro ao fazer login", result.error || "Tente novamente");
    }
  }

  async function handleRegister() {
    if (!registerName || !registerEmail || !registerPassword) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios");
      return;
    }

    if (registerPassword.length < 8) {
      Alert.alert("Erro", "A senha deve ter no mínimo 8 caracteres");
      return;
    }

    setLoading(true);
    const result = await authService.signUp(
      registerEmail,
      registerPassword,
      registerName,
    );
    setLoading(false);

    if (result.success) {
      Alert.alert("Sucesso!", "Conta criada com sucesso! Faça login.", [
        { text: "OK", onPress: () => setWichPage("login") },
      ]);

      setRegisterName("");
      setRegisterEmail("");
      setRegisterPassword("");
      setRegisterCPF("");
    } else {
      Alert.alert("Erro ao criar conta", result.error || "Tente novamente");
    }
  }

  if (wichPage === "login") {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: color.light.lightGray }}>
        <Header leftIcon label="Login" />
        <View style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 18 }}>
          <SwitchPage wichPage="login" onChange={setWichPage} />

          <CustomInput
            headline="Email"
            value={loginEmail}
            returnKeyType="next"
            autoCapitalize="none"
            submitBehavior="submit"
            placeholder="seu@email.com"
            onChangeText={setLoginEmail}
            keyboardType="email-address"
          />

          <CustomInput
            isPassword
            headline="Senha"
            value={loginPassword}
            placeholder="Sua senha"
            submitBehavior="blurAndSubmit"
            onChangeText={setLoginPassword}
          />

          <Spacer vertical size="lg" />

          <Button
            onPress={handleLogin}
            title={
              loading ? (
                <ActivityIndicator size="small" color={color.light.gray} />
              ) : (
                "Entrar"
              )
            }
            disabled={loading}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.light.lightGray }}>
      <Header leftIcon label="Criar conta" />
      <View style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 18 }}>
        <SwitchPage wichPage="register" onChange={setWichPage} />

        <CustomInput
          headline="Nome Completo"
          value={registerName}
          placeholder="Digite seu nome"
          onChangeText={setRegisterName}
        />

        <CustomInput
          headline="Email"
          value={registerEmail}
          autoCapitalize="none"
          placeholder="seu@email.com"
          keyboardType="email-address"
          onChangeText={setRegisterEmail}
        />

        <CustomInput
          isPassword
          headline="Senha"
          placeholder="Sua senha"
          value={registerPassword}
          onChangeText={setRegisterPassword}
        />

        <CustomInput
          headline="CPF (opcional)"
          value={registerCPF}
          keyboardType="numeric"
          placeholder="000.000.000-00"
          onChangeText={setRegisterCPF}
        />

        <Spacer vertical size="lg" />

        <Button
          onPress={handleRegister}
          title={
            loading ? (
              <ActivityIndicator size="small" color={color.light.gray} />
            ) : (
              "Criar conta"
            )
          }
          disabled={loading}
        />
      </View>
    </SafeAreaView>
  );
}
