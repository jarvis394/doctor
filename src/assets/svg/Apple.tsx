import React from 'react'
import { Image } from 'react-native'
import styled from '@emotion/native'

const Root = styled.View({
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'center',
  width: '30px',
  height: '25px',
})

const AppleImage = () => {
  return (
    <Root>
      <Image
        style={{ width: '70%', height: '100%' }}
        source={{
          uri:
            'data:image/svg+xml;utf8,' +
            '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<g clip-path="url(#clip0_9_1512)">' +
            '<path d="M13.8488 0C13.8954 0 13.9419 0 13.9911 0C14.1053 1.41044 13.5669 2.46432 12.9126 3.22751C12.2706 3.98542 11.3915 4.7205 9.96967 4.60897C9.87482 3.21872 10.4141 2.24301 11.0675 1.48158C11.6734 0.771967 12.7844 0.140517 13.8488 0Z" fill="white"/>' +
            '<path d="M18.1531 14.6805C18.1531 14.6945 18.1531 14.7068 18.1531 14.72C17.7535 15.9302 17.1835 16.9674 16.4879 17.9299C15.853 18.8038 15.0748 19.9797 13.6855 19.9797C12.4849 19.9797 11.6875 19.2078 10.4571 19.1867C9.15555 19.1656 8.4398 19.8322 7.24979 19.9999C7.11366 19.9999 6.97754 19.9999 6.84405 19.9999C5.9702 19.8735 5.26498 19.1814 4.75122 18.5579C3.23626 16.7153 2.06558 14.3353 1.84778 11.2896C1.84778 10.991 1.84778 10.6933 1.84778 10.3947C1.93999 8.21493 2.99914 6.44266 4.40695 5.58374C5.14993 5.12706 6.17132 4.73801 7.30863 4.9119C7.79605 4.98742 8.29401 5.15429 8.73049 5.3194C9.14414 5.47836 9.66142 5.76027 10.1515 5.74534C10.4834 5.73568 10.8137 5.56267 11.1483 5.44059C12.1284 5.08667 13.0892 4.68092 14.3556 4.8715C15.8776 5.10159 16.9578 5.77783 17.6252 6.82118C16.3377 7.64057 15.3199 8.87536 15.4938 10.984C15.6483 12.8994 16.7619 14.0201 18.1531 14.6805Z" fill="white"/>' +
            '</g>' +
            '<defs>' +
            '<clipPath id="clip0_9_1512">' +
            '<rect width="20" height="20" fill="white"/>' +
            '</clipPath>' +
            '</defs>' +
            '</svg>',
        }}
      />
    </Root>
  )
}

export default AppleImage
