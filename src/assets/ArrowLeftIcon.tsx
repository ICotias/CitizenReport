import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

type ArrowLeftIconProps = SvgProps & {
  size?: number;
  color?: string;
};

export function ArrowLeftIcon({
  size = 24,
  color = "#000",
  ...props
}: ArrowLeftIconProps) {
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 256 256"
      {...props}
    >
      <Path d="M228,128a12,12,0,0,1-12,12H69l51.52,51.51a12,12,0,0,1-17,17l-72-72a12,12,0,0,1,0-17l72-72a12,12,0,0,1,17,17L69,116H216A12,12,0,0,1,228,128Z" />
    </Svg>
  );
}
