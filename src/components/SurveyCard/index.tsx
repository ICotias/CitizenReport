import { CheckCircle } from "@/src/assets/CheckCircle";

import { ProgressBarButtom } from "@/src/components/ProgressBarButtom";
import { color } from "@/src/theme/color";
import { typography } from "@/src/theme/typography";
import { useState } from "react";
import { FlatList, Text, View } from "react-native";

type Props = {
  title: string;
  type: string;
  description: string;
  end: string;
  button: string[];
};

export function SurveyCard({ button, description, end, title, type }: Props) {
  const [clicksA, setClicksA] = useState(0);
  const [clicksB, setClicksB] = useState(0);
  const [clicksC, setClicksC] = useState(0);

  const [voted, setVoted] = useState(false);

  const totalClicks = clicksA + clicksB + clicksC;

  const handleVote = (index: number) => {
    if (index === 0) {
      setClicksA(clicksA + 1);
    } else if (index === 1) {
      setClicksB(clicksB + 1);
    } else if (index === 2) {
      setClicksC(clicksC + 1);
    }
    setVoted(true);
  };

  const votes = totalClicks + " votos";

  return (
    <View
      style={{
        borderWidth: 2,
        borderColor: color.dark.gray,
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 10,
        gap: 5,
        marginTop: 20,
        backgroundColor: color.dark.white,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>{title}</Text>
        <View
          style={{
            backgroundColor: color.dark.lightGray,
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 4,
          }}
        >
          <Text style={{ fontSize: typography.caption.fontSize }}>{type}</Text>
        </View>
      </View>

      <Text style={{ color: color.dark.darkGray }}>{description}</Text>

      <View style={{ flexDirection: "row" }}>
        <Text style={{ color: color.dark.darkGray }}>
          {votes} • {end}
        </Text>
      </View>

      <FlatList
        data={button}
        keyExtractor={(idx) => idx.toString()}
        renderItem={({ item, index }) => (
          <ProgressBarButtom
            label={item}
            clicks={
              index === 0
                ? clicksA
                : index === 1
                  ? clicksB
                  : index === 2
                    ? clicksC
                    : 0
            }
            totalClicks={totalClicks}
            onPress={() => handleVote(index)}
          />
        )}
      />

      {voted ? (
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "row",
          }}
        >
          <CheckCircle size={18} color="green" />
          <Text style={{ color: "green" }}> Voto registrado com sucesso!</Text>
        </View>
      ) : (
        <Text style={{ alignSelf: "center", color: color.dark.darkGray }}>
          Clique em uma opção para votar
        </Text>
      )}
    </View>
  );
}
