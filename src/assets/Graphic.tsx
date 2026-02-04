import * as React from "react";
import { Svg, Path, SvgProps } from "react-native-svg";

type GraphicProps = SvgProps & {
  size?: number;
  color?: string;
};

export function Graphic({
  size = 24,
  color = "#000000",
  ...props
}: GraphicProps) {
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 256 256"
      {...props}
    >
      <Path d="M224,200h-8V40a8,8,0,0,0-8-8H152a8,8,0,0,0-8,8V80H96a8,8,0,0,0-8,8v40H48a8,8,0,0,0-8,8v64H32a8,8,0,0,0,0,16H224a8,8,0,0,0,0-16ZM160,48h40V200H160ZM104,96h40V200H104ZM56,144H88v56H56Z" />
    </Svg>
  );
}
