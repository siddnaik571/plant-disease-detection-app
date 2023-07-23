import React from 'react'
import { useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, FlatList, TouchableOpacity, Image, ActivityIndicator, ImageBackground } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar } from '../components'
import Ionicons from '@expo/vector-icons/Ionicons'
import { authentication } from './firebase/firebase-config'
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const Login = ({navigation}) => {

  //states for email and password
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')

  //state for setting visibility of password
  const [passwordVisible, setPasswordVisible]= useState(true)

  //state for ActivityIndicator
  const [loading,setLoading]=useState(false)

  //state for focusing on input
  const [focused,setFocused]=useState(null)

  const handleFocus=(field)=>setFocused(field)
  const handleBlur=()=>setFocused(null)

  const borderColor=(field)=>focused===field?COLORS.secondary:COLORS.graylight

  const LoginUser=()=>{
    setLoading(true)
    signInWithEmailAndPassword(authentication,email,password)
    .then((re)=>{
      console.log(re)
      // navigation.navigate('HomeScreen')
      setLoading(false)
      navigation.navigate('MainTabs', { screen: 'Tab1', params: { screen: 'HomeScreen' } })
    })
    .catch((err)=>{
      //console.log(re)
    })
  }

  const LogOutUser=()=>{
    signOut(authentication)
    .then((re)=>{

    })
    .catch((err)=>{
      //console.log(err)
    })
  }

    return (
        <SafeAreaView style={styles.container}>
            <FocussedStatusBar background={COLORS.primary}/>
            <ImageBackground source={{uri: 'https://firebasestorage.googleapis.com/v0/b/plantify-app-bf1df.appspot.com/o/DreamShaper_v7_light_and_bright_green_background_with_small_an_4%20(1)%201.png?alt=media&token=5c268dd1-844c-40df-9ab1-f479b573b9f3'}} style={{flex:1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{alignItems: 'center', marginBottom: 30}}>
                    <Image style={styles.image} source={require('../assets/ProjectLogo2.png')} resizeMode='contain'/>
                    <Text style={styles.ztext}>Plantify</Text>
                </View>
                <View style={styles.secondaryContainer}>
                    {/* <Image style={styles.image} source={require('../assets/ProjectLogo.png')} resizeMode='contain'/> */}
                    <View>
                        <Text style={styles.mainText}>Welcome Back!</Text>
                    </View>
                    <View style={{width: '100%'}}>
                        <View style={[styles.inputContainer,{borderColor: borderColor('field1')}]}>
                            <Ionicons name='mail-outline' size={14} color={COLORS.grayneutral} style={{flex: 1}}/>
                            <TextInput 
                                placeholder='Email' 
                                style={styles.textInput} 
                                value={email} 
                                onChangeText={text=>setEmail(text)} 
                                inputMode='email'
                                cursorColor={COLORS.secondary}  
                                onFocus={()=>handleFocus('field1')}
                                onBlur={handleBlur}
                            />
                        </View>
                        <View style={[styles.inputContainer,{borderColor: borderColor('field2')}]}>
                            <Ionicons name='lock-closed-outline' size={14} color={COLORS.grayneutral} style={{flex: 1}}/>
                            <TextInput 
                                placeholder='Password' 
                                style={styles.textInput} 
                                value={password}
                                secureTextEntry={passwordVisible}
                                onChangeText={text=>setPassword(text)}
                                cursorColor={COLORS.secondary}
                                onFocus={()=>handleFocus('field2')}
                                onBlur={handleBlur}
                            />
                            <Ionicons name={passwordVisible?'eye-off-outline':'eye-outline'} size={14} color={COLORS.grayneutral} onPress={()=>setPasswordVisible(!passwordVisible)}/>
                        </View>
          
                        <View style={styles.fpassword}>
                            <Text style={{fontSize: SIZES.small, color: COLORS.tertiary}} onPress={()=>navigation.navigate('ForgotPassword')}>
                                Forgot Password?
                            </Text>
                        </View>
                        {loading?
                        <ActivityIndicator size="large" color={COLORS.secondary}/>:
                        <TouchableOpacity style={styles.buttonContainer} onPress={LoginUser}>
                            <Text style={styles.button}>LOG IN </Text>
                        </TouchableOpacity>}
                    </View>
                    <View style={{marginTop: 40, flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={{color: COLORS.graydark}}>Don't have an account?</Text>
                        <Text style={styles.linkScreen} onPress={()=>navigation.navigate('Signup')}> Sign Up</Text>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    secondaryContainer: {
        width: '85%',
        paddingHorizontal: 25,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        paddingVertical: 30
    },
    image: {
        width: 100,
        height: 100,
        // marginVertical: 20
    },
    mainText: {
        fontSize: SIZES.extraLarge,
        color: COLORS.secondary,
        marginBottom: 35,
        fontFamily: FONTS.semiBold
    },
    inputContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        // borderColor: COLORS.graylight,
        borderRadius: 6,
        width: '100%',
        padding: 9,
        marginBottom: 20,
        alignItems: 'center',
    },
    textInput: {
        color: COLORS.graydark,
        flex: 8
    },
    fpassword: {
        flexDirection: 'row',
        marginBottom: 9,
        justifyContent: 'flex-end'
    },
    buttonContainer: {
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 9,
        borderRadius: 4
    }, 
    button: {
        color: COLORS.white
    },
    linkScreen: {
        color: COLORS.secondary,
        fontSize: SIZES.font,
        fontFamily: FONTS.semiBold
    },
    ztext: {
      fontSize: SIZES.extraLarge,
      fontFamily: FONTS.bold,
      color: COLORS.tertiary
  }
})

export default Login