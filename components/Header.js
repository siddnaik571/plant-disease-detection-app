import { StyleSheet, Text, View, Pressable } from 'react-native'
import SideMenu from './SideMenu'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'

const Header = (props) => {
  return (
    <Pressable style={styles.header}>
        <Text>Plantify App</Text>
        <Ionicons name='ellipsis-vertical' size={20} onPress={props.changeSideMenuState} color="#708090"/>
        {/* <SideMenu/> */}
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
})