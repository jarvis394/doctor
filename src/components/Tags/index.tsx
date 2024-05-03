import styled from '@emotion/native'
import * as React from 'react'
import { View } from 'react-native'

const TagContainer = styled.View({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 8,
})

const Tag = styled.Text({
  color: '#fff',
  backgroundColor: '#1E1E1E',
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 40,
})

const Tags: React.FC = () => (
  <TagContainer>
    <Tag>Повторяющееся</Tag>
    <Tag>Визит</Tag>
    <Tag>Консультация</Tag>
  </TagContainer>
)

export default Tags
