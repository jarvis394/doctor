import React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationProps } from '@routes/app.routes'

const MainScreen: React.FC<NavigationProps<'MainScreen'>> = ({
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
            navigation.push('AssistantScreen')
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
        <Text variant="labelMedium">hello world!</Text>
      </View>
    </SafeAreaView>
  )
}

export default MainScreen
