import { Button } from "@/src/components/CustomButtom";
import { CustomInput } from "@/src/components/CustomInput";
import { Header } from "@/src/components/Header";
import { Spacer } from "@/src/components/Spacer";
import { SwitchPage } from "@/src/components/SwitchPage";
import { useCurrentUser } from "@/src/contexts/currentUser";
import { AuthRouteProps } from "@/src/routes/AuthRoutes";
import { color } from "@/src/theme/color";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type OnBoardingRouteProp = RouteProp<AuthRouteProps, "OnBoarding">;

export function OnBoarding() {
  const { params } = useRoute<OnBoardingRouteProp>();
  const { login } = useCurrentUser();

  const [wichPage, setWichPage] = useState<"login" | "register">(
    params?.page ?? "login"
  );

  if (wichPage === "login") {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: color.light.lightGray }}>
        <Header leftIcon label="Login" />
        <View style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 18 }}>
          <SwitchPage wichPage="login" onChange={setWichPage} />
          <CustomInput placeholder="seu@email.com" headline="Email" />

          <CustomInput placeholder="password" headline="Senha" isPassword />

          <Spacer vertical size="lg" />

          <Button onPress={login} title="Entrar" />
        </View>
      </SafeAreaView>
    );
  } else if (wichPage === "register") {
    const onSubmit = (data: any) => {
      setWichPage("login");
    };
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: color.light.lightGray }}>
        <Header leftIcon label="Criar conta " />
        <View style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 18 }}>
          <SwitchPage wichPage="register" onChange={setWichPage} />
          <CustomInput placeholder="Digite seu nome" headline="Nome Completo" />

          <CustomInput placeholder="seu@email.com" headline="Email" />

          <CustomInput placeholder="password" headline="Senha" isPassword />

          <CustomInput placeholder="000.000.000-00" headline="CPF (opcional)" />

          <Spacer vertical size="lg" />

          <Button onPress={onSubmit} title="Criar conta" />
        </View>
      </SafeAreaView>
    );
  }
}
