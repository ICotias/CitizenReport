import { color } from "@/src/theme/color";
import { typography } from "@/src/theme/typography";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Filter = {
  label: string;
  count?: number;
};

type Props = {
  setSelectedFilter: (label: string) => void;
  filterSelected: string;
  separated?: boolean;
  filters: Filter[];
};

export function FilterBarItem({
  setSelectedFilter,
  filterSelected,
  separated = true,
  filters,
}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        styles.list,
        separated ? styles.listSeparated : undefined,
      ]}
    >
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter.label}
          style={[
            styles.button,
            {
              backgroundColor:
                filterSelected === filter.label
                  ? color.dark.black
                  : color.dark.white,
              borderWidth: filterSelected === filter.label ? 2 : 2,
              borderColor:
                filterSelected === filter.label
                  ? color.dark.black
                  : color.dark.gray,
            },
          ]}
          onPress={() => setSelectedFilter(filter.label)}
        >
          <View style={styles.labelCountWrapper}>
            <Text
              style={[
                styles.textTitle,
                {
                  color:
                    filterSelected === filter.label
                      ? color.dark.white
                      : color.dark.black,
                },
              ]}
            >
              {filter.label}
              {typeof filter.count === "number" && (
                <Text
                  style={[
                    styles.countText,
                    {
                      color:
                        filterSelected === filter.label
                          ? color.dark.white
                          : color.dark.black,
                    },
                  ]}
                >
                  {` (${filter.count})`}
                </Text>
              )}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 20,
  },
  listSeparated: {
    gap: 8,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
  labelCountWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  textTitle: {
    fontSize: typography.subhead.fontSize,
  },
  countContainer: {
    marginLeft: 4,
  },
  countText: {
    fontSize: typography.subhead.fontSize,
    fontWeight: "bold",
  },
});
