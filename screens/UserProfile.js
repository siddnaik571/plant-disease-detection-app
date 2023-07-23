import React from 'react'
import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, FlatList, TouchableOpacity, Image, Pressable, ImageBackground } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar } from '../components'
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
            navigation.push('Login')
        })
        .catch((err)=>{
          //console.log(err)
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <FocussedStatusBar background={COLORS.primary}/>
            <ImageBackground source={{uri: 'https://firebasestorage.googleapis.com/v0/b/plantify-app-bf1df.appspot.com/o/DreamShaper_v7_light_and_bright_green_background_with_small_an_4%20(1)%201.png?alt=media&token=5c268dd1-844c-40df-9ab1-f479b573b9f3'}} style={{width: '100%', flex: 1}}>
            <View style={styles.header}>
                <Ionicons name='chevron-back' size={30} color={COLORS.tertiary} onPress={()=>navigation.push('HomeScreen')}/>
                <Text style={styles.ztext}>My Profile</Text>
                <View style={{width: 30, height: 30}}></View>
            </View>
            <View style={styles.secondaryContainer}>
                <View style={styles.userInfo}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.userImg}
                            source={{uri: user.photoURL}}
                        />
                    </View>
                    <View>
                        <Text style={styles.name}>{user.displayName}</Text>
                        <Text style={styles.email}>{user.email}</Text>
                        <TouchableOpacity style={styles.buttonContainer} onPress={()=>navigation.push('EditProfile')}>
                            <Text style={styles.button}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.optionContainer} onPress={()=>navigation.push('Help')}>
                    <View style={styles.option}>
                        <MaterialIcons name='help-outline' size={25} color={COLORS.graydark}/>
                        <Text style={{color: COLORS.graydark, fontSize: SIZES.medium}}>Help</Text>
                    </View>
                    <Ionicons name='chevron-forward' size={20} color={COLORS.graydark}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionContainer}  onPress={()=>navigation.push('AppInfo')}>
                    <View style={styles.option}>
                        <MaterialIcons name='info-outline' size={25} color={COLORS.graydark}/>
                        <Text style={{color: COLORS.graydark, fontSize: SIZES.medium}}>App Info</Text>
                    </View>
                    <Ionicons name='chevron-forward' size={20} color={COLORS.graydark}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionContainer} onPress={LogOutUser}>
                    <View style={styles.option}>
                        <MaterialIcons name='logout' size={25} color={COLORS.graydark}/>
                        <Text style={{color: COLORS.graydark, fontSize: SIZES.medium}}>Log Out</Text>
                    </View>
                    <Ionicons name='chevron-forward' size={20} color={COLORS.graydark}/>
                </TouchableOpacity>
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
        // borderBottomWidth: 1,
        // borderColor: COLORS.graylight,
    },
    secondaryContainer: {
        width: '100%',
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 20
    },
    userInfo: {
        flexDirection: 'row',
        gap: 20,
        backgroundColor: COLORS.white,
        marginBottom: 20,
        borderRadius: 5,
        paddingVertical: 8,
        alignItems: 'center'
    },
    imageContainer: {
        flexDirection: 'row',
        paddingHorizontal: 9,
        alignItems: 'center',
    },
    userImg: {
        alignContent:'center',
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    name: {
        color: COLORS.primary,
        fontSize: SIZES.large,
        fontFamily: FONTS.medium,
        marginVertical: 2
    },
    email: {
        color: COLORS.graydark,
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        marginBottom: 4
    },
    buttonContainer: {
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7,
        borderRadius: 5,
        borderMargin:10,
        marginVertical:10,
    }, 
    button: {
        color: COLORS.white,
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        paddingVertical: 10,
        paddingHorizontal: 8,
        marginBottom: 20,
        borderRadius: 5
    },
    option: {
        flexDirection: 'row',
        gap:8
    },
    ztext: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.tertiary
    }
})  

export default UserProfile