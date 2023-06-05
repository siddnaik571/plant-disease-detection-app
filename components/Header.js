import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'

const Header = (props) => {
  return (
    <Pressable style={styles.header}>
        {/* <Text>Plantify App</Text> */}
        <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/plantify-app-bf1df.appspot.com/o/plantifytypelogo.png?alt=media&token=e582219b-f19a-4093-a6ad-08d5d488b82c'}} style={styles.logo} resizeMode='contain'/>
        {/* <Ionicons name='ellipsis-vertical' size={20} color="#708090"/> */}
    </Pressable>
  )
}

export default Header

const styles = StyleSheet.create({
    header: {
        height: 60,
        width: '100%',
        // position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: '#EBEFEC',
    },
    logo: {
      width: 70,
      height: 30
    }
})