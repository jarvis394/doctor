import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Button } from 'react-native-paper';

export function HomeScreen({ navigation }: {navigation: any}) {
  return (
    <View style={style.container}>
      <Text>Home Screen</Text>
      <Button mode="contained" onPress={() => navigation.navigate('Details')}>
        Go to details
      </Button>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});