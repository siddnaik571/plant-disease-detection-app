import React from 'react'
import { useState } from 'react'
import { Text, View, StyleSheet, TextInput, SafeAreaView, TouchableOpacity, Image, ActivityIndicator, ToastAndroid, ImageBackground } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar } from '../components'
import Ionicons from '@expo/vector-icons/Ionicons'
import { sendPasswordResetEmail } from "firebase/auth"
import { authentication } from './firebase/firebase-config'

const ForgotPassword = ({navigation}) => {
    const [email, setEmail]=useState('')

     //state for ActivityIndicator
    const [loading,setLoading]=useState(false)

    //state for focusing on input
    const [focused,setFocused]=useState(null)

    const handleFocus=(field)=>setFocused(field)
    const handleBlur=()=>setFocused(null)

    const borderColor=(field)=>focused===field?COLORS.secondary:COLORS.graylight

    //function for resetPassword
    const ResetPassword = () => {
        setLoading(true)
        sendPasswordResetEmail(authentication, email)
        .then(() => {
            ToastAndroid.showWithGravity(
                'Email sent',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
            setLoading(false)
            setEmail('')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
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
                <View><Text style={styles.mainText}>Forgot Password?</Text></View>
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
                    {
                        loading?
                        <ActivityIndicator size="large" color={COLORS.secondary}/>:
                        <TouchableOpacity style={styles.buttonContainer} onPress={ResetPassword}>
                          <Text style={styles.button}>CONFIRM</Text>
                        </TouchableOpacity>
                    }
                </View>
                <View style={{marginTop: 40, flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={{color:COLORS.graydark}}>Back to</Text>
                    <Text style={styles.linkScreen} onPress={()=>navigation.navigate('Login')}> Login</Text>
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
        borderRadius: 4,
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

export default ForgotPassword