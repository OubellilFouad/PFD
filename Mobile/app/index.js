import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import App from './screens/App'
import {AuthContext} from '../context/AuthContext'
import { Stack } from 'expo-router'

const index = () => {
  return (
    <AuthContext>
        <SafeAreaView style={{flex: 1,backgroundColor:'white',}}>
            <Stack.Screen 
                options={{
                    headerStyle: {backgroundColor: 'red'},
                    headerShadowVisible: false,
                    headerTitle: 'App'
                }}
            />
            <App/>
        </SafeAreaView>
    </AuthContext>
  )
}

export default index