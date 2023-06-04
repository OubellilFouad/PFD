import { View, Text } from 'react-native'
import React from 'react'

const Hours = () => {
  return (
    <View style={{flexDirection:'row'}}>
      <View style={{flex:1,borderColor:'lightgray',borderWidth:1,display:'flex',justifyContent:'center',alignItems:'center',paddingVertical:4}}><Text></Text></View>
      <View style={{flex:1,borderColor:'lightgray',borderWidth:1,display:'flex',justifyContent:'center',alignItems:'center',paddingVertical:4}}><Text style={{fontSize:7}}>08h00 - 09h30</Text></View>
      <View style={{flex:1,borderColor:'lightgray',borderWidth:1,display:'flex',justifyContent:'center',alignItems:'center',paddingVertical:4}}><Text style={{fontSize:7}}>09h40 - 11h10</Text></View>
      <View style={{flex:1,borderColor:'lightgray',borderWidth:1,display:'flex',justifyContent:'center',alignItems:'center',paddingVertical:4}}><Text style={{fontSize:7}}>11h20 - 12h50</Text></View>
      <View style={{flex:1,borderColor:'lightgray',borderWidth:1,display:'flex',justifyContent:'center',alignItems:'center',paddingVertical:4}}><Text style={{fontSize:7}}>13h00 - 14h30</Text></View>
      <View style={{flex:1,borderColor:'lightgray',borderWidth:1,display:'flex',justifyContent:'center',alignItems:'center',paddingVertical:4}}><Text style={{fontSize:7}}>14h40 - 16h10</Text></View>
      <View style={{flex:1,borderColor:'lightgray',borderWidth:1,display:'flex',justifyContent:'center',alignItems:'center',paddingVertical:4}}><Text style={{fontSize:7}}>16h20 - 17h50</Text></View>
    </View>
  )
}

export default Hours