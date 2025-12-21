import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

type CameraProps = SvgProps & {
  size?: number;
  color?: string;
};

export function Camera({
  size = 32,
  color = "#000",
  ...props
}: CameraProps) {
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 256 256"
      {...props}
    >
      <Path d="M208,56H180.28L166.65,35.56A8,8,0,0,0,160,32H96a8,8,0,0,0-6.65,3.56L75.71,56H48A24,24,0,0,0,24,80V192a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V80A24,24,0,0,0,208,56ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z" />
    </Svg>
  );
}

