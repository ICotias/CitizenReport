import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

type HospitalProps = SvgProps & {
  size?: number;
  color?: string;
};

export function Hospital({
  size = 24,
  color = "#000",
  ...props
}: HospitalProps) {
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 256 256"
      {...props}
    >
      <Path d="M224,208H200V128a16,16,0,0,0-16-16H136V64a16,16,0,0,0-16-16H64A16,16,0,0,0,48,64V208H32a12,12,0,0,0,0,24H224a12,12,0,0,0,0-24ZM64,64h56V208H64Zm128,144H136V128h56Zm-8-96a12,12,0,0,1-12,12H164a12,12,0,0,1,0-24h16A12,12,0,0,1,184,112Zm0,32a12,12,0,0,1-12,12H164a12,12,0,0,1,0-24h16A12,12,0,0,1,184,144Z" />
    </Svg>
  );
}
