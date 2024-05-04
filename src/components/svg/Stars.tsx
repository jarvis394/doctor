import styled from '@emotion/native'
import React from 'react'
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  SvgProps,
} from 'react-native-svg'

const Root = styled.View({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
})

const Stars: React.FC<SvgProps & { gradientId?: string }> = ({
  gradientId = 'stars_gradient',
  style,
  ...props
}) => {
  return (
    <Root style={style}>
      <Svg width="12" height="15" viewBox="0 0 12 15" fill="none" {...props}>
        <Path
          d="M8.055 11.055L6 12L8.055 12.945L9 15L9.945 12.945L12 12L9.945 11.055L9 9L8.055 11.055ZM4.5 9L5.91 5.91L9 4.5L5.91 3.09L4.5 0L3.09 3.09L0 4.5L3.09 5.91L4.5 9Z"
          fill={`url(#${gradientId})`}
        />
        <Defs>
          <LinearGradient
            id={gradientId}
            x1="12.375"
            y1="-6"
            x2="-22.125"
            y2="33"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#E3B4FF" />
            <Stop offset="0.5" stopColor="#9DC4FF" />
            <Stop offset="1" stopColor="#7785FF" />
          </LinearGradient>
        </Defs>
      </Svg>
    </Root>
  )
}

export default Stars
