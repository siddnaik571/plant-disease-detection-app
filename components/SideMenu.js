import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SideMenu = () => {
  return (
    <View style={styles.sideMenu}>
      <View style={styles.sideMenuOption}>
        <Text>Settings</Text>
      </View>
      <View style={styles.sideMenuOption}>
        <Text>Help</Text>
      </View>
      <View style={styles.sideMenuOption}>
        <Text>Help</Text>
      </View>
    </View>
  )
}

export default SideMenu

const styles = StyleSheet.create({
    sideMenu: {
        width: 150,
        position: 'absolute',
        right: 5,
        top: 5,
        borderWidth: 1,
        zIndex: 1
    },
    sideMenuOption: {
        height: 30
    }
})