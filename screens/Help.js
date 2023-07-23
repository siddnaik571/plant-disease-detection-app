import React from 'react'
import { Text, View, StyleSheet, SafeAreaView, Pressable, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar } from '../components'
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons'

const Help = ({navigation}) => {

    return (
        <SafeAreaView style={styles.container}>
            <FocussedStatusBar background={COLORS.primary}/>
            <ImageBackground source={{uri: 'https://firebasestorage.googleapis.com/v0/b/plantify-app-bf1df.appspot.com/o/DreamShaper_v7_light_and_bright_green_background_with_small_an_4%20(1)%201.png?alt=media&token=5c268dd1-844c-40df-9ab1-f479b573b9f3'}} style={{flex:1, width: '100%'}}>
                <View style={styles.header}>
                    <AntDesign name='arrowleft' size={30} color={COLORS.tertiary} onPress={()=>navigation.push('UserProfile')}/>
                    <Text style={styles.ztext}>Help</Text>
                    <View style={{width: 30, height: 30}}></View>
                </View>
                <View style={styles.secondaryContainer }>
                    <View >
                        <View style={{marginTop:30,marginBottom:10}}>
                            <Text style={styles.subText}>Help resources</Text>
                        </View>
                        <TouchableOpacity style={styles.inputContainer} onPress={()=>navigation.navigate('Help1')}>
                            <Ionicons name='document-text' size={20} color={COLORS.graydark}/>
                            <Text style={styles.boxText}>How to use Scanner</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.inputContainer} onPress={()=>navigation.navigate('Help2')}>
                            <Ionicons name='document-text' size={20} color={COLORS.graydark}/>
                            <Text style={styles.boxText}>How to use Community chat</Text>
                        </TouchableOpacity>
              
                        <TouchableOpacity style={styles.inputContainer} onPress={()=>navigation.navigate('Help3')}>
                            <Ionicons name='document-text' size={20} color={COLORS.graydark}/>
                            <Text style={styles.boxText}>How to use Plant Care</Text>
                        </TouchableOpacity> 
                    </View>
                    <View style={{marginBottom:10}}>
                        <Text style={styles.subText}>Feedback</Text>
                    </View>
                    <TouchableOpacity style={styles.inputContainer} onPress={()=>navigation.navigate('Help3')}>
                        <Ionicons name='chatbox' size={20} color={COLORS.graydark} onPress={()=>navigation.navigate('UserProfile')}/>
                        <Text style={styles.boxText}>Send Feedback</Text>
                    </TouchableOpacity> 
                </View>
            </ImageBackground>
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
        // borderBottomWidth: 1,
        // borderColor: '#EBEFEC',
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
        // borderWidth: 1,
        // borderColor: '#EBEFEC',
        color: COLORS.grayneutral,
        borderRadius: 6,
        width: '100%',
        padding: 15,
        marginBottom: 20,
        alignItems: 'center',
        gap: 10,
        backgroundColor: COLORS.white
    },
    boxText: {
        color: COLORS.graydark
    },
    subText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.large, 
        color: COLORS.tertiary
    },
    ztext: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.tertiary
    }
})
export default Help