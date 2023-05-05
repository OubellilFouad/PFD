import React from 'react'
import { Text, View } from 'react-native'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'expo-router';

const App = () => {
  const {test} = useAuth();  
  return (
    <View>
        <Link href={'/screens/test'}>
            {test}
        </Link>
    </View>
  )
}

export default App