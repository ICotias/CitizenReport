import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

type ClipboardProps = SvgProps & {
  size?: number;
  color?: string;
};

export function ClipboardIcon({
  size = 24,
  color = "#000",
  ...props
}: ClipboardProps) {
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 256 256"
      {...props}
    >
      <Path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A20,20,0,0,0,36,52V216a20,20,0,0,0,20,20H200a20,20,0,0,0,20-20V52A20,20,0,0,0,200,32ZM128,24a32,32,0,0,1,32,32H96A32,32,0,0,1,128,24Zm76,188H52V56H76V80a12,12,0,0,0,24,0V56h56V80a12,12,0,0,0,24,0V56h24Z" />
    </Svg>
  );
}
