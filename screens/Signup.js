import React from 'react'
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar } from '../components'
import Ionicons from '@expo/vector-icons/Ionicons'
import { authentication } from './firebase/firebase-config'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";

const Signup = ({navigation}) => {

  //state to check if user is signed in
  const [isSignedIn, setIsSignedIn]=useState(false)

  //states for email and password
  const [name, setName]=useState('')
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')

  //state for setting visibility of password
  const [passwordVisible, setPasswordVisible]= useState(true)

  //state for ActivityIndicator
  const [loading,setLoading]=useState(false)

  //function to create user
  const RegisterUser=()=>{
      setLoading(true)
      createUserWithEmailAndPassword(authentication,email,password)
      .then((re)=>{
        setIsSignedIn(true)
        // const user=authentication.currentUser
        // user.displayName=name

        updateProfile(authentication.currentUser, {
          displayName: name
        }).then(()=>{
          console.log(authentication.currentUser.displayName)
          navigation.navigate('HomeScreen')
        }).catch((error)=>{

        })

        //console.log(re)
        
      })
      .catch((re)=>{
        console.log(re)
      })
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <FocussedStatusBar background={COLORS.primary}/>
      <View style={styles.secondaryContainer}>
        <Image style={styles.image} source={require('../assets/images/test.png')}/>
        <Text style={styles.mainText}>Create an account</Text>
        <View>
          <View style={styles.inputContainer}>
            <Ionicons name='person-outline' size={14} color={COLORS.gray} style={{flex: 1}}/>
            <TextInput placeholder='Name' 
                        value={name} 
                        style={styles.textInput}
                        onChangeText={text=>setName(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name='mail-outline' size={14} color={COLORS.gray} style={{flex: 1}}/>
            <TextInput placeholder='Email'
                       value={email} 
                       style={styles.textInput}
                       onChangeText={text=>setEmail(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name='lock-closed-outline' value={password} size={14} color={COLORS.gray} style={{flex: 1}}/>
            <TextInput 
              placeholder='Password' 
              style={styles.textInput} 
              secureTextEntry={passwordVisible}
              value={password}
              onChangeText={text=>setPassword(text)}
            />
            <Ionicons name={passwordVisible?'eye-off-outline':'eye-outline'} size={14} color={COLORS.gray} onPress={()=>setPasswordVisible(!passwordVisible)}/>
          </View>
          {loading?
          <ActivityIndicator size="large" color={COLORS.primary}/>:
          <TouchableOpacity style={styles.buttonContainer} onPress={RegisterUser}>
            <Text style={styles.button}>SIGN UP</Text>
          </TouchableOpacity>}
        </View>
        <View style={{marginTop: 40, flexDirection: 'row', justifyContent: 'center'}}>
          <Text>Already have an account?</Text>
          <Text style={styles.linkScreen} onPress={()=>navigation.navigate('Login')}> Log In</Text>
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
    borderRadius: 4
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

export default Signup