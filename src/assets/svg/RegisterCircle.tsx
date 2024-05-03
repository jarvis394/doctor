import React from 'react'
import { Image } from 'react-native'
import styled from '@emotion/native'

const Root = styled.View({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100px',
})

const RegisterCircleImage = () => {
  return (
    <Root>
      <Image
        style={{ width: '100px', height: '100px' }}
        source={{
          uri:
            'data:image/svg+xml;utf8,' +
            '<svg width="97" height="97" viewBox="0 0 97 97" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<circle cx="48.5" cy="48.5" r="48" fill="url(#paint0_linear_9_1729)"/>' +
            '<defs>' +
            '<linearGradient id="paint0_linear_9_1729" x1="26.375" y1="0.500001" x2="72.5" y2="96.5" gradientUnits="userSpaceOnUse">' +
            '<stop stop-color="#326AFA"/>' +
            '<stop offset="1" stop-color="#E1E1E1"/>' +
            '</linearGradient>' +
            '</defs>' +
            '</svg>',
        }}
      />
    </Root>
  )
}

export default RegisterCircleImage
