import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { FileCard } from './FileCard'
import styled from '@emotion/native'
import tinycolor from 'tinycolor2'
import { useAdaptiveTheme } from '@hooks/useAdaptiveTheme'
import { TouchableRipple } from 'react-native-paper'

const Root = styled.ScrollView({
  display: 'flex',
  gap: 10,
  paddingHorizontal: 16,
})

const FileCardContainer = styled.View({
  marginRight: 8,
})

const AddFileCard = styled(TouchableRipple)(({ theme }) => ({
  backgroundColor: tinycolor(theme.colors.primary).setAlpha(0.24).toRgbString(),
  marginRight: 8,
  width: 116,
  height: 116,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 28,
}))

const FilePickerUnmemoized: React.FC = () => {
  const theme = useAdaptiveTheme()

  return (
    <Root horizontal showsHorizontalScrollIndicator={false}>
      <AddFileCard borderless onPress={() => console.log('press')}>
        <MaterialIcons
          color={theme.colors.text}
          name="add-circle-outline"
          size={32}
        />
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
