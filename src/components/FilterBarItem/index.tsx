import { color } from "@/src/theme/color";
import { typography } from "@/src/theme/typography";

import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

export const FILTERS = [
  { label: "Todos" },
  { label: "Pendente" },
  { label: "Em Progresso" },
  { label: "Resolvido" },
];

type Props = {
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
  filterSelected: string;
};

export function FilterBarItem({ setSelectedFilter, filterSelected }: Props) {
  return (
    <ScrollView
      contentContainerStyle={styles.list}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {FILTERS.map(({ label }) => (
        <TouchableOpacity
          key={label}
          style={[
            styles.button,
            {
              backgroundColor:
                filterSelected === label ? color.dark.black : color.dark.gray,
            },
          ]}
          onPress={() => [setSelectedFilter(label)]}
        >
          <Text
            style={[
              styles.textTitle,
              {
                color:
                  filterSelected === label
                    ? color.dark.white
                    : color.dark.black,
              },
            ]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    width: "100%",
    justifyContent: "space-evenly",
  },
  button: {
    alignSelf: "center",
    padding: 12,
    borderRadius: 18,
  },
  textTitle: {
    fontSize: typography.subhead.fontSize,
  },
});
