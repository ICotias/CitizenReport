import * as React from "react";
import { StyleProp, ViewStyle } from "react-native";
import Svg, { Path } from "react-native-svg";

type PointProps = {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function Point({ size = 24, color = "#000000", style }: PointProps) {
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 256 256"
      style={style}
    >
      <Path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z" />
    </Svg>
  );
}
