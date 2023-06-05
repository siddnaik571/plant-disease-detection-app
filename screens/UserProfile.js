import React from 'react'
import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, FlatList, TouchableOpacity, Image, Pressable } from 'react-native'
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
            <View style={styles.header}>
                <Ionicons name='chevron-back' size={20} color={COLORS.graydark} onPress={()=>navigation.push('HomeScreen')}/>
                <Text style={{color: COLORS.graydark, fontFamily: FONTS.semiBold}}>My Profile</Text>
                <Ionicons name='settings-outline' size={20} color={COLORS.graydark}/>
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
                <TouchableOpacity style={styles.optionContainer}>
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
        borderColor: COLORS.graylight,
    },
    secondaryContainer: {
        width: '100%',
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 20
    },
    userInfo: {
        flexDirection: 'row',
        gap: 20
    },
    imageContainer: {
        flexDirection: 'row',
        padding: 9,
        marginBottom: 20,
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
        fontSize: SIZES.medium,
        fontFamily: FONTS.medium,
        marginVertical: 2
    },
    email: {
        color: COLORS.graydark,
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        marginVertical: 4
    },
    buttonContainer: {
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7,
        borderRadius: 4,
        borderMargin:10,
        marginVertical:10,
    }, 
    button: {
        color: COLORS.white,
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    option: {
        flexDirection: 'row',
        gap:8
    },
})  

export default UserProfile