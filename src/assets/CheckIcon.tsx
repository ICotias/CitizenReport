import React from "react";
import Svg, { Path } from "react-native-svg";

// Adiciona cor e tamanho personalizáveis via props
type CheckIconProps = {
  size?: number;
  color?: string;
  style?: object;
};

export function CheckIcon({
  size = 24,
  color = "#000000",
  style = {},
}: CheckIconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      style={style}
      fill="none"
    >
      <Path
        d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"
        fill={color}
      />
    </Svg>
  );
}
