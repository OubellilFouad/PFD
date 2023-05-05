import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const test = () => {
  return (
    <View>
      <Stack.Screen 
                options={{
                    headerStyle: {backgroundColor: 'red'},
                    headerShadowVisible: false,
                    headerTitle: 'App'
                }}
      />
      <Text>test</Text>
    </View>
  )
}

export default test