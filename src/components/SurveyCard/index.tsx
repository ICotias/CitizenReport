import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import { color } from "@/src/theme/color";
import { useSurveyResults } from "@/src/hooks/useSurveyResults";
import { submitVote } from "@/src/services/vote/submitVote";

type SurveyCardProps = {
  surveyId: string;
  title: string;
  type: string;
  description: string;
  end: string;
  options: Array<{ id: string; label: string }>;
  disableVote?: boolean;
  userVotedOption?: string;
};

export function SurveyCard({
  surveyId,
  title,
  type,
  description,
  end,
  options,
  disableVote,
  userVotedOption,
}: SurveyCardProps) {
  const {
    results,
    totalVotes,
    userVoted,
    userVotedOption: internalUserVotedOption,
    loading,
  } = useSurveyResults(surveyId);
  const [submitting, setSubmitting] = useState(false);
  const [localVoted, setLocalVoted] = useState(false);
  const [localVotedOption, setLocalVotedOption] = useState<string | undefined>(
    undefined,
  );

  // Use prop if passed, else local hook, else local state
  const isVoted =
    localVoted || (typeof disableVote === "boolean" ? disableVote : userVoted);
  const chosenOption =
    localVotedOption ||
    (userVotedOption !== undefined ? userVotedOption : internalUserVotedOption);

  const handleVote = async (optionId: string) => {
    if (isVoted) {
      Alert.alert("Atenção", "Você já votou nesta enquete");
      return;
    }

    setSubmitting(true);
    try {
      await submitVote({ surveyId, optionId });
      // Atualiza o estado local imediatamente
      setLocalVoted(true);
      setLocalVotedOption(optionId);
      Alert.alert("Sucesso", "Seu voto foi registrado!");
    } catch (error: any) {
      Alert.alert(
        "Erro",
        error.message || "Não foi possível registrar seu voto",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const getPercentage = (optionId: string): number => {
    if (totalVotes === 0) return 0;
    return Math.round(((results[optionId] || 0) / totalVotes) * 100);
  };

  if (loading) {
    return (
      <View style={styles.card}>
        <ActivityIndicator size="small" color={color.dark.gray} />
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.typeTag}>
            <Text style={styles.typeText}>{type}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.description}>{description}</Text>

      <View style={styles.metaInfo}>
        <Text style={styles.metaText}>{totalVotes} votos</Text>
        <Text style={styles.metaText}>•</Text>
        <Text style={styles.metaText}>{end}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {options.map((option) => {
          const percentage = getPercentage(option.id);
          const isSelected = chosenOption === option.id;
          const voteCount = results[option.id] || 0;

          return (
            <TouchableOpacity
              key={option.id}
              style={[styles.optionButton, isVoted && styles.optionButtonVoted]}
              onPress={() => handleVote(option.id)}
              disabled={isVoted || submitting}
              activeOpacity={isVoted ? 1 : 0.7}
            >
              {/* Barra de progresso - só aparece após votar */}
              {isVoted && (
                <View
                  style={[styles.progressBar, { width: `${percentage}%` }]}
                />
              )}

              <View style={styles.optionContent}>
                <Text style={styles.optionText}>{option.label}</Text>

                {/* Percentual - só aparece após votar */}
                {isVoted && (
                  <Text style={styles.percentage}>{percentage}%</Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Instrução antes de votar */}
      {!isVoted && (
        <Text style={styles.instructionText}>
          Clique em uma opção para votar
        </Text>
      )}

      {/* Mensagem de sucesso após votar */}
      {isVoted && (
        <View style={styles.successContainer}>
          <View style={styles.checkIcon}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
          <Text style={styles.successText}>Voto registrado com sucesso!</Text>
        </View>
      )}

      {submitting && (
        <ActivityIndicator
          size="small"
          color={color.dark.gray}
          style={styles.loadingIndicator}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  header: {
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    flex: 1,
  },
  typeTag: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666666",
  },
  description: {
    fontSize: 15,
    color: "#666666",
    marginBottom: 12,
    lineHeight: 20,
  },
  metaInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  metaText: {
    fontSize: 13,
    color: "#999999",
  },
  optionsContainer: {
    gap: 10,
    marginBottom: 16,
  },
  optionButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    overflow: "hidden",
    position: "relative",
  },
  optionButtonVoted: {
    backgroundColor: "#F8F8F8",
  },
  progressBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#E0E0E0",
  },
  optionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1,
  },
  optionText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#000000",
    flex: 1,
  },
  percentage: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000000",
    marginLeft: 12,
  },
  instructionText: {
    fontSize: 14,
    color: "#999999",
    textAlign: "center",
    marginTop: 4,
  },
  successContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 4,
  },
  checkIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#34C759",
    alignItems: "center",
    justifyContent: "center",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  successText: {
    fontSize: 14,
    color: "#34C759",
    fontWeight: "600",
  },
  loadingIndicator: {
    marginTop: 12,
  },
});
