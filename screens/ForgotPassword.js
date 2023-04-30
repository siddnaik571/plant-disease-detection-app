import React from 'react'
import { useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar } from '../components'
import Ionicons from '@expo/vector-icons/Ionicons'

const ForgotPassword = ({navigation}) => {
  const [email, setEmail]=useState('')
  //const [password, setPassword]=useState('')

  //const [passwordVisible, setPasswordVisible]= useState(true)

  return (
    <SafeAreaView style={styles.container}>
      <FocussedStatusBar background={COLORS.primary}/>
      <View style={styles.secondaryContainer}>
        <Image style={styles.image} source={require('../assets/images/test.png')}/>
        <Text style={styles.mainText}>Forgot Password?</Text>
        <View>
          <View style={styles.inputContainer}>
            <Ionicons name='mail-outline' size={14} color={COLORS.gray} style={{flex: 1}}/>
            <TextInput placeholder='Email' style={styles.textInput} value={email} onChangeText={text=>setEmail(text)}/>
          </View>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.button}>CONFIRM </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 40, flexDirection: 'row', justifyContent: 'center'}}>
          <Text>Back to</Text>
          <Text style={styles.linkScreen} onPress={()=>navigation.navigate('Login')}> Login</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles=StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 60
    },
    secondaryContainer: {
      width: '100%',
    },
    image: {
      width: 100,
      height: 100,
      marginVertical: 20
    },
    mainText: {
      fontSize: SIZES.extraLarge,
      color: '#2BA84A',
      marginBottom: 35,
      fontFamily: FONTS.semiBold
    },
    inputContainer: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: '#EBEFEC',
      color: '#120438',
      borderRadius: 6,
      width: '100%',
      padding: 9,
      marginBottom: 20,
      alignItems: 'center'
    },
    textInput: {
      color: COLORS.primary,
      flex: 8
    },
    buttonContainer: {
      backgroundColor: '#248232',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 9,
      borderRadius: 4,
    }, 
    button: {
      color: '#FFF'
    },
    linkScreen: {
      color: '#2BA84A',
      fontSize: SIZES.font,
      fontFamily: FONTS.semiBold
    },
  })

export default ForgotPassword