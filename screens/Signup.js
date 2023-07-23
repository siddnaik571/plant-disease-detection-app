import React from 'react'
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, FlatList, TouchableOpacity, Image, ActivityIndicator, ImageBackground } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar } from '../components'
import Ionicons from '@expo/vector-icons/Ionicons'
import { authentication } from './firebase/firebase-config'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";

const Signup = ({navigation}) => {

    //states for email and password
    const [name, setName]=useState('')
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

    //function to create user
    const RegisterUser=()=>{
        setLoading(true)
        createUserWithEmailAndPassword(authentication,email,password)
        .then((re)=>{
            updateProfile(authentication.currentUser, {
                displayName: name,
                photoURL: 'https://firebasestorage.googleapis.com/v0/b/plantify-app-bf1df.appspot.com/o/user_img%2Fprofile_picture.png?alt=media&token=3459ff68-b3db-43d4-834d-6ceb1b425194'
            }).then(()=>{
                setLoading(false)
                navigation.navigate('MainTabs', { screen: 'Tab1', params: { screen: 'HomeScreen' } })
            }).catch((error)=>{

            })
        })
        .catch((re)=>{
            console.log(re)
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
                    <View>
                        {/* <Image style={styles.image} source={require('../assets/ProjectLogo.png')} resizeMode='contain'/> */}
                        <Text style={styles.mainText}>Create an account</Text>
                    </View>
                    <View style={{width: '100%'}}>
                        <View style={[styles.inputContainer,{borderColor: borderColor('field1')}]}>
                            <Ionicons name='person-outline' size={14} color={COLORS.grayneutral} style={{flex: 1}}/>
                            <TextInput placeholder='Name' 
                                value={name} 
                                style={styles.textInput}
                                onChangeText={text=>setName(text)}
                                cursorColor={COLORS.secondary}
                                onFocus={()=>handleFocus('field1')}
                                onBlur={handleBlur}
                            />
                        </View>
                        <View style={[styles.inputContainer,{borderColor: borderColor('field2')}]}>
                            <Ionicons name='mail-outline' size={14} color={COLORS.grayneutral} style={{flex: 1}}/>
                            <TextInput placeholder='Email'
                                value={email} 
                                style={styles.textInput}
                                onChangeText={text=>setEmail(text)}
                                inputMode='email'
                                cursorColor={COLORS.secondary} 
                                onFocus={()=>handleFocus('field2')}
                                onBlur={handleBlur}
                            />
                        </View>
                        <View style={[styles.inputContainer,{borderColor: borderColor('field3')}]}>
                            <Ionicons name='lock-closed-outline' value={password} size={14} color={COLORS.grayneutral} style={{flex: 1}}/>
                            <TextInput 
                                placeholder='Password' 
                                style={styles.textInput} 
                                secureTextEntry={passwordVisible}
                                value={password}
                                onChangeText={text=>setPassword(text)}
                                cursorColor={COLORS.secondary}
                                onFocus={()=>handleFocus('field3')}
                                onBlur={handleBlur}
                            />
                            <Ionicons name={passwordVisible?'eye-off-outline':'eye-outline'} size={14} color={COLORS.grayneutral} onPress={()=>setPasswordVisible(!passwordVisible)}/>
                        </View>
                        {loading?
                        <ActivityIndicator size="large" color={COLORS.secondary}/>:
                        <TouchableOpacity style={styles.buttonContainer} onPress={RegisterUser}>
                            <Text style={styles.button}>SIGN UP</Text>
                        </TouchableOpacity>}
                    </View>
                    <View style={{marginTop: 40, flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={{color: COLORS.graydark}}>Already have an account?</Text>
                        <Text style={styles.linkScreen} onPress={()=>navigation.navigate('Login')}> Log In</Text>
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
        //borderColor: COLORS.graylight,
        borderRadius: 6,
        width: '100%',
        padding: 9,
        marginBottom: 20,
        alignItems: 'center'
    },
    textInput: {
        color: COLORS.graydark,
        flex: 8
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

export default Signup