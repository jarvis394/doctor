import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { FileCard } from './FileCard'
import styled from '@emotion/native'
import tinycolor from 'tinycolor2'
import { useAdaptiveTheme } from '@hooks/useAdaptiveTheme'
import { TouchableRipple } from 'react-native-paper'

const Root = styled.ScrollView({
  display: 'flex',
  paddingVertical: 20,
  paddingHorizontal: 20,
  gap: 10,
})

const FileCardContainer = styled.View({
  marginRight: 20,
})

const AddFileCard = styled(TouchableRipple)(
  {
    marginRight: 20,
    width: 116,
    height: 116,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
  },
  ({ theme }) => ({
    backgroundColor: tinycolor(theme.colors.primary)
      .setAlpha(0.24)
      .toRgbString(),
  })
)

const FilePickerUnmemoized: React.FC = () => {
  const theme = useAdaptiveTheme()

  return (
    <Root horizontal showsHorizontalScrollIndicator={false}>
      <AddFileCard onPress={() => console.log('press')}>
        <MaterialIcons color={theme.colors.text} name="add-circle" size={32} />
      </AddFileCard>
      <FileCardContainer>
        <FileCard />
      </FileCardContainer>
      <FileCardContainer>
        <FileCard />
      </FileCardContainer>
      <FileCardContainer>
        <FileCard />
      </FileCardContainer>
      <FileCardContainer>
        <FileCard />
      </FileCardContainer>
      <FileCardContainer>
        <FileCard />
      </FileCardContainer>
    </Root>
  )
}

export const FilePicker = React.memo(FilePickerUnmemoized)
