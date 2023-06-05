import React from 'react'
import { Text, View, StyleSheet, SafeAreaView, Pressable, Image } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar } from '../components'
import Ionicons from '@expo/vector-icons/Ionicons'

const Help = ({navigation}) => {

  return (
    <SafeAreaView style={styles.container}>
      <FocussedStatusBar background={COLORS.primary}/>
        <View style={styles.header}>
                <Pressable >
                    <Ionicons name='arrow-back-outline' size={30} onPress={()=>navigation.navigate('UserProfile')} color="#708090"/>
                </Pressable>
        </View>
        <View style={styles.secondaryContainer }>
            <View >
                <View style={{marginTop:30,marginBottom:10}}>
                <Text style={styles.subText}>Help resources</Text>
                </View>
              <View style={styles.inputContainer}>
                <Pressable >
                  <Ionicons name='document-text' size={20} color={COLORS.graydark} style={{flex: 1}} onPress={()=>navigation.navigate('UserProfile')}/>
                </Pressable>
                <Text style={styles.boxText}>How to use Scanner</Text>
              </View>

              <View style={styles.inputContainer}>
                <Pressable>
                  <Ionicons name='document-text' size={20} color={COLORS.graydark} style={{flex: 1}} onPress={()=>navigation.navigate('UserProfile')}/>
                </Pressable>
                <Text style={styles.boxText}>How to use Community chat</Text>
              </View>
              
              <View style={styles.inputContainer}>
                <Pressable>
                  <Ionicons name='document-text' size={20} color={COLORS.graydark} style={{flex: 1}} onPress={()=>navigation.navigate('UserProfile')}/>
                </Pressable>
                <Text style={styles.boxText}>How to use Plant Care</Text>
              </View>
            
            </View>
            <View style={{marginBottom:10}}>
                <Text style={styles.subText}>Feedback</Text>
            </View>
            <View style={styles.inputContainer}>
              <Pressable>
                <Ionicons name='chatbox' size={20} color={COLORS.graydark} style={{flex: 1}} onPress={()=>navigation.navigate('UserProfile')}/>
              </Pressable>              
                <Text style={styles.boxText}>Send Feedback</Text>
              </View>
          </View>
        </SafeAreaView>
      )
}

const styles=StyleSheet.create({
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
    container: {
      flex: 1,
    },
    secondaryContainer: {
      width: '100%',
      padding:20,
    },
    mainText: {
      fontSize: SIZES.extraLarge,
      color: '#2BA84A',
      fontFamily: FONTS.semiBold
    },
    inputContainer: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: '#EBEFEC',
      color: '#120438',
      borderRadius: 6,
      width: '100%',
      padding: 15,
      marginBottom: 20,
      alignItems: 'center',
      gap:20
    },
    textInput: {
      color: COLORS.primary,
      flex: 8
    },
    boxText: {
        fontFamily: FONTS.light,
        flex:5
    },
    subText: {
        fontFamily: FONTS.medium
    },
    
})
export default Help