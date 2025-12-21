import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

type SignOutProps = SvgProps & {
  size?: number
  color?: string
}

export function SignOut({ size = 32, color = '#000', ...props }: SignOutProps) {
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      viewBox='0 0 256 256'
      {...props}
    >
      <Path d='M112,216a8,8,0,0,1-8,8H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h56a8,8,0,0,1,0,16H48V208h56A8,8,0,0,1,112,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L196.69,120H104a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,221.66,122.34Z' />
    </Svg>
  )
}

export default SignOut
