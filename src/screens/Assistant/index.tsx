import { NavigationProps } from '@routes/app.routes'
import React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const AssistantScreen: React.FC<NavigationProps<'AssistantScreen'>> = ({
  navigation,
}) => {
  return (
    <SafeAreaView>
      <View
        style={{
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <Button
          onPress={() => {
            navigation.push('MainScreen')
          }}
          mode="contained"
          contentStyle={{
            height: 52,
          }}
          labelStyle={{
            fontSize: 16,
            fontFamily: 'GoogleSans-Medium',
          }}
          style={{
            borderRadius: 24,
          }}
        >
          Сохранить
        </Button>
        <Text variant="labelMedium">AssistantScreen</Text>
      </View>
    </SafeAreaView>
  )
}

export default AssistantScreen
