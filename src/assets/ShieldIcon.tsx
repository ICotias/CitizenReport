import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

type ShieldIconProps = SvgProps & {
  size?: number;
  color?: string;
};

export function ShieldIcon({
  size = 32,
  color = "#000",
  ...props
}: ShieldIconProps) {
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 256 256"
      {...props}
    >
      <Path d="M208,40H48A16,16,0,0,0,32,56V114.8c0,92.36,78.1,123,93.75,128.18a15.44,15.44,0,0,0,4.5.62,15.44,15.44,0,0,0,4.5-.62C150.9,237.78,224,207.16,224,114.8V56A16,16,0,0,0,208,40ZM48,56H208v58.8c0,73.56-60.53,99.53-76,105-15.47-5.42-76-31.39-76-104.95V56Zm88,96a12,12,0,0,1-12-12V108a12,12,0,0,1,24,0v32A12,12,0,0,1,136,152Zm0,16a12,12,0,1,1-12,12A12,12,0,0,1,136,168Z" />
    </Svg>
  );
}
