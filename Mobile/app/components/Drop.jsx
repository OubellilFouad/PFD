import React, { useEffect } from 'react'
import { Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const Drop = ({arr,setData,label}) => {
  return (
    <View>
      <Text style={{color:'#rgba(60,72,107,0.6)'}}>{label}</Text>
      <Dropdown style={{borderColor:'#3C486B', borderBottomWidth:1,paddingLeft:6}} itemTextStyle={{color:'#3C486B'}} selectedTextStyle={{color: '#rgba(60,72,107,0.6)'}} data={arr} labelField={'label'} valueField={'choose'}  onChange={(e) => setData(e.value)} />
    </View>
  )
}

export default Drop