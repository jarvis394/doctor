import styled from '@emotion/native'
import React from 'react'
import { ScrollViewProps } from 'react-native'
import {
  Edge,
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Root = styled(KeyboardAwareScrollView)({
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '100%',
  flexGrow: 1,
})

const SafeArea = styled(SafeAreaView)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: 16,
})

type ScreenProps = React.PropsWithChildren<
  {
    safeAreaProps?: SafeAreaViewProps
    safeAreaWithBottomEdge?: boolean
  } & ScrollViewProps
>

const Screen: React.FC<ScreenProps> = ({
  children,
  safeAreaProps,
  safeAreaWithBottomEdge = false,
  ...props
}) => {
  const baseSafeAreaEdges: Edge[] = ['top', 'left', 'right']
  const safeAreaEdges: Edge[] = baseSafeAreaEdges.concat(
    safeAreaWithBottomEdge ? ['bottom'] : []
  )

  return (
    <Root
      contentContainerStyle={{
        flexGrow: 1,
      }}
      {...props}
    >
      <SafeArea edges={safeAreaEdges} {...safeAreaProps}>
        {children}
      </SafeArea>
    </Root>
  )
}

export default Screen
