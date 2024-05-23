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
  paddingTop: 20,
})

const FileCardContainer = styled.View({
  marginRight: 14,
})

const AddFileCard = styled(TouchableRipple)(({ theme }) => ({
  backgroundColor: tinycolor(theme.colors.primary).setAlpha(0.24).toRgbString(),
  marginRight: 14,
  width: 116,
  height: 116,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 28,
}))

type FilePickerUnmemoizedProps = {
  isEditing: boolean
}

const FilePickerUnmemoized: React.FC<FilePickerUnmemoizedProps> = ({
  isEditing,
}) => {
  const theme = useAdaptiveTheme()

  return (
    <Root horizontal showsHorizontalScrollIndicator={false}>
      <AddFileCard borderless onPress={() => console.log('press add')}>
        <MaterialIcons
          color={theme.colors.text}
          name="add-circle-outline"
          size={32}
        />
      </AddFileCard>
      <FileCardContainer>
        <FileCard isEditing={isEditing} />
      </FileCardContainer>
      <FileCardContainer>
        <FileCard isEditing={isEditing} />
      </FileCardContainer>
      <FileCardContainer>
        <FileCard isEditing={isEditing} />
      </FileCardContainer>
      <FileCardContainer>
        <FileCard isEditing={isEditing} />
      </FileCardContainer>
      <FileCardContainer>
        <FileCard isEditing={isEditing} />
      </FileCardContainer>
    </Root>
  )
}

export const FilePicker = React.memo(FilePickerUnmemoized)
