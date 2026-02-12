import { useState, useEffect } from "react";
import { GraphicIcon } from "@/src/assets/GraphicIcon";
import { Header } from "@/src/components/Header";

import { color } from "@/src/theme/color";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSurveys } from "@/src/hooks/useSurveys";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { database } from "@/firebaseConfig";
import { ref, onValue, off } from "firebase/database";
import { SurveyCard } from "@/src/components/SurveyCard";

function getTimeRemaining(endsAt: number): string {
  const now = Date.now();
  const diff = endsAt - now;

  if (diff <= 0) return "Encerrada";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 0) return `Encerra em ${days} dia${days > 1 ? "s" : ""}`;
  if (hours > 0) return `Encerra em ${hours} hora${hours > 1 ? "s" : ""}`;
  return "Encerra em breve";
}

type SurveyVoteStatus = {
  [surveyId: string]: {
    voted: boolean;
    votedOptionId?: string;
  };
};

export function SurveyScreen() {
  const { surveys, loading, error } = useSurveys();
  const [uid, setUid] = useState<string | null>(null);
  const [voteStatus, setVoteStatus] = useState<SurveyVoteStatus>({});

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUid(user?.uid ?? null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!uid || surveys.length === 0) {
      setVoteStatus({});
      return;
    }

    let listeners: Array<() => void> = [];

    let updated: SurveyVoteStatus = {};

    surveys.forEach((survey) => {
      const resultRef = ref(database, `surveyUserVotes/${survey.id}/${uid}`);
      const handler = onValue(resultRef, (snapshot) => {
        if (snapshot.exists()) {
          const optionVotedId = snapshot.val();
          updated = {
            ...updated,
            [survey.id]: {
              voted: true,
              votedOptionId: optionVotedId,
            },
          };
        } else {
          updated = {
            ...updated,
            [survey.id]: {
              voted: false,
            },
          };
        }
        setVoteStatus((prev) => ({
          ...prev,
          [survey.id]: updated[survey.id],
        }));
      });
      listeners.push(() => off(resultRef, "value", handler));
    });

    return () => {
      listeners.forEach((offFn) => offFn());
    };
  }, [surveys, uid]);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <Header label="Enquetes Públicas" leftIcon />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={color.dark.gray} />
          <Text style={{ marginTop: 16, color: color.dark.gray }}>
            Carregando enquetes...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <Header label="Enquetes Públicas" leftIcon />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#FF0000",
              textAlign: "center",
            }}
          >
            Erro ao carregar enquetes
          </Text>
          <Text
            style={{
              marginTop: 8,
              fontSize: 14,
              color: color.dark.gray,
              textAlign: "center",
            }}
          >
            {error}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Header label="Enquetes Públicas" leftIcon />

      <View
        style={{
          backgroundColor: "#1C1C1E",
          paddingVertical: 20,
          paddingHorizontal: 20,
          marginBottom: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <GraphicIcon size={32} color="#FFFFFF" />
          <View
            style={{
              flex: 1,
              marginLeft: 16,
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 17,
                fontWeight: "600",
                marginBottom: 4,
              }}
            >
              Participe das decisões
            </Text>
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 13,
                lineHeight: 18,
                opacity: 0.9,
              }}
            >
              Sua opinião ajuda a prefeitura a tomar decisões mais alinhadas com
              as necessidades da comunidade.
            </Text>
          </View>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={
            <Text
              style={{
                fontSize: 22,
                fontWeight: "600",
                marginBottom: 16,
                color: "#000000",
              }}
            >
              Enquetes Ativas ({surveys.length})
            </Text>
          }
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 100,
          }}
          renderItem={({ item }) => {
            const isVoted = Boolean(
              uid &&
              voteStatus &&
              voteStatus[item.id] &&
              voteStatus[item.id].voted,
            );
            const votedOptionId =
              uid &&
              voteStatus &&
              voteStatus[item.id] &&
              voteStatus[item.id].votedOptionId
                ? voteStatus[item.id].votedOptionId
                : undefined;
            // Se o usuário ainda não está pronto, desabilita votos
            const isDisabled = !uid || isVoted;

            return (
              <SurveyCard
                surveyId={item.id}
                title={item.title}
                type={item.type}
                description={item.description}
                end={getTimeRemaining(item.endsAt)}
                options={Object.entries(item.options).map(([id, label]) => ({
                  id,
                  label,
                }))}
                disableVote={isDisabled}
                userVotedOption={votedOptionId}
              />
            );
          }}
          data={surveys}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <View style={{ paddingVertical: 48, alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: color.dark.gray,
                }}
              >
                📭 Nenhuma enquete ativa no momento
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}
