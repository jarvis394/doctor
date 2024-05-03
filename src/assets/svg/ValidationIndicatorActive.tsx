import React from 'react'
import { Image } from 'react-native'

const ValidationIndicatorActiveImage = () => {
  return (
    <Image
      style={{ width: '10px', height: '10px' }}
      source={{
        uri:
          'data:image/svg+xml;utf8,' +
          '<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">' +
          '<circle cx="4.5" cy="4.5" r="4" fill="#45FF26"/>' +
          '</svg>',
      }}
    />
  )
}

export default ValidationIndicatorActiveImage
