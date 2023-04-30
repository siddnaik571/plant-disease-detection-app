import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native'
import SideMenu from './SideMenu'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'

const SearchBar = (props) => {
  return (
    <Pressable style={styles.searchBar}>
        <TextInput placeholder=''/>
        <Ionicons name='ellipsis-vertical' size={20} onPress={props.changeSideMenuState}/>
    </Pressable>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    searchBar: {
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
        borderBottomWidth: 1
    },
})