import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const TabBar = ({navigation},props) => {

  const [active, setActive]=useState()

  return (
    <View style={styles.tabBar}>
      <View style={styles.iconholder}>
        <Ionicons name='home-outline' size={27} onPress={()=>navigation.navigate('HomeScreen')} color="#708090"/>
      </View>
      <View style={styles.iconholder}>
        <Ionicons name='people-outline' size={27} onPress={()=>navigation.navigate('CommunityTimeline')} color="#708090"/>
      </View>
      <View style={styles.iconholder}>
        <Ionicons name='notifications-outline' size={27} onPress={()=>navigation.navigate('CommunityTimeline')} color="#708090"/>
      </View>
      <View style={styles.iconholder}>
        <Ionicons name='person-outline' size={27} onPress={()=>navigation.navigate('UserProfile')} color="#708090"/>
      </View>
    </View>
  )
}

export default TabBar

const styles = StyleSheet.create({
    tabBar: {
      height: 60,
      width: '100%',
      // position: 'absolute',
      bottom: 0,
      zIndex: 1,
      flexDirection: 'row',
      borderTopWidth: 1,
      borderColor: '#EBEFEC',
      // backgroundColor: '#F7FDF8'
    },
    iconholder: {
      width: '25%',
      justifyContent: 'center',
      alignItems: 'center',
    }
})