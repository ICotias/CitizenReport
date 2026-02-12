import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

type TrashIconProps = SvgProps & {
  size?: number;
  color?: string;
};

export function TrashIcon({
  size = 24,
  color = "#000",
  ...props
}: TrashIconProps) {
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 256 256"
      {...props}
    >
      <Path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a12,12,0,0,0,0,24h4V208a20,20,0,0,0,20,20H192a20,20,0,0,0,20-20V72h4a12,12,0,0,0,0-24ZM104,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H104ZM192,208H64V72H192ZM112,104v64a12,12,0,0,1-24,0V104a12,12,0,0,1,24,0Zm56,0v64a12,12,0,0,1-24,0V104a12,12,0,0,1,24,0Z" />
    </Svg>
  );
}
