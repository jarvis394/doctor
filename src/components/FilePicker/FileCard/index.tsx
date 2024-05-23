import React from 'react'
import styled from '@emotion/native'
import { Surface, Text, TouchableRipple } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useAdaptiveTheme } from '@hooks/useAdaptiveTheme'

const Root = styled(Surface)({
  display: 'flex',
  position: 'relative',
  flexDirection: 'row',
  paddingVertical: 14,
  paddingHorizontal: 16,
  height: 116,
  width: 167,
  borderRadius: 28,
})

const Content = styled.View({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  width: '100%',
})

const DeleteIconWrapper = styled(TouchableRipple)({
  position: 'absolute',
  borderRadius: 100,
  backgroundColor: 'white',
  right: -15,
  top: -15,
  padding: 10,
})

const SecondaryText = styled(Text)({
  fontSize: 16,
  fontWeight: '500',
  fontFamily: 'GoogleSans-Regular',
  lineHeight: 19,
  width: '100%',
})

type FileCardUnmemoizedProps = {
  isEditing: boolean
}

const FileCardUnmemoized: React.FC<FileCardUnmemoizedProps> = ({
  isEditing,
}) => {
  const theme = useAdaptiveTheme()

  return (
    <Root elevation={2} mode="flat">
      <Content>
        <MaterialIcons color={theme.colors.text} name="attach-file" size={24} />
        <SecondaryText numberOfLines={1} ellipsizeMode="tail">
          VeryLongFileNameDocument.xml
        </SecondaryText>
      </Content>
      {isEditing && (
        <DeleteIconWrapper onPress={() => console.log('press')} borderless>
          <MaterialIcons color="#EA4335" name="close" size={24} />
        </DeleteIconWrapper>
      )}
    </Root>
  )
}

export const FileCard = React.memo(FileCardUnmemoized)
