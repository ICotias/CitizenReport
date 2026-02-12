import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

type QuestionMarkIconProps = SvgProps & {
  size?: number;
  color?: string;
};

export function QuestionMarkIcon({
  size = 32,
  color = "#000",
  ...props
}: QuestionMarkIconProps) {
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 256 256"
      {...props}
    >
      <Path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm12-44a12,12,0,1,1-12-12A12,12,0,0,1,140,172Zm-4-48c-13.23,0-24-9-24-20.13,0-11.31,11.53-20.12,24-20.12s24,8.81,24,20.12a12,12,0,0,1-24,0c0-2.21-2.25-4.12-4-4.12s-4,1.91-4,4.12c0,8.75,8,16.13,20,16.13a12,12,0,0,1,0,24Z" />
    </Svg>
  );
}
