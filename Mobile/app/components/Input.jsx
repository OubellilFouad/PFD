import { View, Text, TextInput } from 'react-native'
import React from 'react'

const Input = ({setData,placeholder,label,value,secure}) => {
  return (
    <View style={{display:'flex',flexDirection:'column'}}>
      <Text style={{color:'rgba(60,72,107,0.6)'}}>{label}</Text>
      <TextInput secureTextEntry={secure} style={{borderBottomColor:'#3C486B',borderBottomWidth:1,paddingLeft:6,color:'#3C486B',height: 35}} value={value} placeholderTextColor={'rgba(60,72,107,0.6)'} placeholder={placeholder} onChangeText={(e) => {
        setData(e)
      }}/>
    </View>
  )
}

export default Input