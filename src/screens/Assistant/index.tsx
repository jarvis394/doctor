import { Button } from '@components/Button'
import { BottomTabNavigationProps } from '@routes/app.routes'
import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const AssistantScreen: React.FC<
  BottomTabNavigationProps<'AssistantScreen'>
> = ({ navigation }) => {
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
            navigation.jumpTo('MainScreen')
          }}
        >
          На MainScreen
        </Button>
        <Text variant="bodyLarge">AssistantScreen</Text>
      </View>
    </SafeAreaView>
  )
}

export default AssistantScreen
