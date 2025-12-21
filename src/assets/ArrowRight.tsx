import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

type ArrowRightProps = SvgProps & {
  size?: number;
  color?: string;
};

export function ArrowRight({
  size = 32,
  color = "#000",
  ...props
}: ArrowRightProps) {
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 256 256"
      {...props}
    >
      <Path d="M184.49,136.49l-72,72a12,12,0,0,1-17-17L159,128,95.51,64.49a12,12,0,0,1,17-17l72,72A12,12,0,0,1,184.49,136.49Z" />
    </Svg>
  );
}

export default ArrowRight;

