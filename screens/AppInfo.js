import React from 'react'
import { Text, View, StyleSheet, SafeAreaView, Pressable, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar } from '../components'
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons'

const AppInfo = ({navigation}) => {

    return (
        <SafeAreaView style={styles.container}>
            <FocussedStatusBar background={COLORS.primary}/>
            <ImageBackground source={{uri: 'https://firebasestorage.googleapis.com/v0/b/plantify-app-bf1df.appspot.com/o/DreamShaper_v7_light_and_bright_green_background_with_small_an_4%20(1)%201.png?alt=media&token=5c268dd1-844c-40df-9ab1-f479b573b9f3'}} style={{flex:1, width: '100%'}}>
                <View style={styles.header}>
                    <AntDesign name='arrowleft' size={30} color={COLORS.tertiary} onPress={()=>navigation.push('UserProfile')}/>
                    <Text style={styles.ztext}>App Info</Text>
                    <View style={{width: 30, height: 30}}></View>
                </View>
        
                <ScrollView style={styles.secondaryContainer} showsVerticalScrollIndicator={false}>
                    <View style={styles.mainBox}>
                        {/* <View>
                            <Text style={styles.heading}>How to use Scanner</Text>
                        </View> */}
                    <View style={styles.mainContent}>
                        <Text>Plantify is an android app which is specially designed 
                          for people working in the agricultural sector which helps reduce the 
                          load taken in detecting diseases in plant leaves thus allowing to detect 
                          diseases early and preventing huge losses.
                        </Text>
                    </View>
                </View>
            </ScrollView>
            </ImageBackground>
        </SafeAreaView>
      )
}

const styles = StyleSheet.create({
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
    heading: {
        fontSize: SIZES.extraLarge,
        color: COLORS.primary,
        marginBottom: 10,
        fontFamily: FONTS.semiBold,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondaryContainer: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 16,
    },
    mainBox: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: 10,
        marginTop: 20,
        justifyContent: 'space-between'
    },
    mainText: {
        fontSize: SIZES.medium,
        color: COLORS.secondary,
        fontFamily: FONTS.semiBold
    },
    mainContent:{
        fontSize:SIZES.large,
        color: COLORS.grayneutral,
        fontFamily: FONTS.medium,
        width: '100%',
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        rowGap: 8,
        backgroundColor: COLORS.white,
        justifyContent: 'space-between',
        padding: 20,
        borderRadius: 8,
        marginBottom: 20
    },
    ztext: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.tertiary
    },
    text: {
        color: COLORS.graydark
    }
})

export default AppInfo