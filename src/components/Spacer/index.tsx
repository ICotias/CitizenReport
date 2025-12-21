// Spacer.tsx
import { spacing, SpacingKey } from "@/src/theme/spacing";
import React from "react";
import { View } from "react-native";

interface SpacerProps {
  size: SpacingKey;
  horizontal?: boolean;
  vertical?: boolean;
}

export function Spacer({ size, horizontal, vertical }: SpacerProps) {
  const value = spacing[size];
  if (horizontal) {
    return <View style={{ width: value }} />;
  }

  if (vertical) {
    return <View style={{ height: value }} />;
  }

  return <View style={{ height: value }} />;
}
