import React from 'react'
import Svg, { Path, G, Defs, LinearGradient, Stop } from 'react-native-svg'

const TipsAndUpdatesIcon = () => (
  <Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
    <G id="tips_and_updates">
      <Path
        id="Vector"
        d="M6.75 21H10.75C10.75 22.1 9.85 23 8.75 23C7.65 23 6.75 22.1 6.75 21ZM4.75 20H12.75V18H4.75V20ZM16.25 10.5C16.25 14.32 13.59 16.36 12.48 17H5.02C3.91 16.36 1.25 14.32 1.25 10.5C1.25 6.36 4.61 3 8.75 3C12.89 3 16.25 6.36 16.25 10.5ZM14.25 10.5C14.25 7.47 11.78 5 8.75 5C5.72 5 3.25 7.47 3.25 10.5C3.25 12.97 4.74 14.39 5.6 15H11.9C12.76 14.39 14.25 12.97 14.25 10.5ZM21.12 8.37L19.75 9L21.12 9.63L21.75 11L22.38 9.63L23.75 9L22.38 8.37L21.75 7L21.12 8.37ZM18.75 7L19.69 4.94L21.75 4L19.69 3.06L18.75 1L17.81 3.06L15.75 4L17.81 4.94L18.75 7Z"
        fill="url(#paint0_linear)"
      />
    </G>
    <Defs>
      <LinearGradient
        id="paint0_linear"
        x1="24"
        y1="1"
        x2="1"
        y2="23"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E3B4FF" />
        <Stop offset="0.5" stopColor="#9DC4FF" />
        <Stop offset="1" stopColor="#7785FF" />
      </LinearGradient>
    </Defs>
  </Svg>
)

export default TipsAndUpdatesIcon
