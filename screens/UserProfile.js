import React from 'react'
import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar, TabBar } from '../components'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { authentication } from './firebase/firebase-config'
import { signOut } from "firebase/auth";

const UserProfile = ({navigation},props) => {

    //variable to get current signed in user
    const user=authentication.currentUser
    
    //function to log out the user
    const LogOutUser=()=>{
      signOut(authentication)
      .then((re)=>{
        // setIsSignedIn(false)
        navigation.push('Login')
      })
      .catch((err)=>{
        //console.log(err)
      })
    }

    return (
      <SafeAreaView style={styles.container}>
        <FocussedStatusBar background={COLORS.primary}/>
        <View style={styles.header}>
          <Ionicons name='chevron-back' size={20} onPress={props.changeSideMenuState} color="#708090"/>
          <Text>My Profile</Text>
          <Ionicons name='settings-outline' size={20} onPress={props.changeSideMenuState} color="#708090"/>
        </View>
        <View style={styles.secondaryContainer}>
          <View style={styles.userInfo}>
            <View style={styles.inputContainer}>
              <Image
                style={styles.userImg}
                source={require('../assets/images/profile_picture.png')}
              />
            </View>
            <View>
              <Text style={styles.name}>{user.displayName}</Text>
              <Text style={styles.linkScreen}>{user.email}</Text>
              <TouchableOpacity style={styles.buttonContainer} onPress = {() => navigation.navigate('EditProfile')}>
                <Text style={styles.button}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.optionContainer} onPress={LogOutUser}>
            <View style={styles.option}>
              <MaterialIcons name='logout' size={20} onPress={props.changeSideMenuState} color="#708090"/>
              <Text>Log Out</Text>
            </View>
            <Ionicons name='chevron-forward' size={20} onPress={props.changeSideMenuState} color="#708090"/>
          </TouchableOpacity>
        </View>
        <TabBar navigation={navigation}/>
      </SafeAreaView>
    )
}
   
const styles=StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header:{
      height: 60,
      width: '100%',
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
    secondaryContainer: {
      width: '100%',
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 20
    },
    inputContainer: {
      flexDirection: 'row',
      color: '#120438',
      padding: 9,
      marginBottom: 20,
      alignItems: 'center',
    },
    userInfo: {
      flexDirection: 'row',
      gap: 20
    },
    textInput: {
      color: COLORS.primary,
      flex: 8
    },
    mainText: {
      fontSize: SIZES.extraLarge,
      color: '#2BA84A',
      marginBottom: 35,
      fontFamily: FONTS.semiBold,
      marginVertical:30
    },
    userImg: {
      alignContent:'center',
      height: 100,
      width: 100,
      borderRadius: 75,
    },
    buttonContainer: {
      backgroundColor: '#248232',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 7,
      borderRadius: 4,
      borderMargin:10,
      marginVertical:10,
    }, 
    button: {
      color: '#FFF',
    },
    linkScreen: {
      color: '#708090',
      fontSize: SIZES.font,
      fontFamily: FONTS.medium,
      marginVertical: 4
    },
    name: {
      color: COLORS.primary,
      fontSize: SIZES.medium,
      fontFamily: FONTS.medium,
      marginVertical: 2
    },
    fpassword: {
      flexDirection: 'row',
      marginBottom: 9,
      justifyContent: 'flex-end'
    },
    image: {
      //alignContent:'center',
      alignSelf:'flex-start',
      width: 40,
      height: 40,
    },
    optionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    option: {
      flexDirection: 'row',
      gap:8
    }
})  

export default UserProfile