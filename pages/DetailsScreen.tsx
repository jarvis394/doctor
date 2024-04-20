import { View, Text, StyleSheet } from 'react-native'

export function DetailsScreen() {
    return (
      <View style={style.container}>
        <Text>Details Screen</Text>
      </View>
    )
  }
  
  const style = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })