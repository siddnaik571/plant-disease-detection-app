import React from 'react'
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, FlatList, TouchableOpacity, Image, ScrollView, Pressable, ImageBackground } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar, QueryBox, TabBar, Header } from '../components'
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons'

const SingleDB = ({route, navigation}) => {
    let uid=0
    const solList=route.params.disease.Solution.map((sol)=><View key={uid++} style={{flexDirection: 'row', width: '100%'}}>
                                                                <Ionicons name='square-sharp' size={9} color={COLORS.secondary} style={{marginTop: 5, marginRight: 4}}/>
                                                                <Text style={{color: COLORS.graydark}}>{`${sol}`}</Text>
                                                            </View>)

    return (
        <SafeAreaView style={styles.container}>
            <FocussedStatusBar background={COLORS.primary}/>
            <ImageBackground source={{uri: 'https://firebasestorage.googleapis.com/v0/b/plantify-app-bf1df.appspot.com/o/DreamShaper_v7_light_and_bright_green_background_with_small_an_4%20(1)%201.png?alt=media&token=5c268dd1-844c-40df-9ab1-f479b573b9f3'}} style={{flex:1, width: '100%'}}>
                <View style={styles.header}>
                    <AntDesign name='arrowleft' size={30} color={COLORS.tertiary} onPress={()=>navigation.push(`${route.params.returnTo}`)}/>
                    <Text style={styles.ztext}>Diseases</Text>
                    <View style={{width: 30, height: 30}}></View>
                </View>
                {/* <View style={{height: 50}}></View> */}
                <ScrollView style={styles.secondaryContainer} showsVerticalScrollIndicator={false}>
                    <View style={styles.titleBox}>
                        <Text style={styles.mainText}>{route.params.disease.Name}</Text>
                        <Text style={styles.subText}>{route.params.disease.Plant}</Text>
                    </View>
                    <Pressable style={styles.contentBox}>
                        <View style={styles.imgCont}><Image source={{uri: route.params.dimg}} style={styles.image}/></View>
                        <Text style={styles.cause}>
                            Cause: <Text style={styles.causeName}>{route.params.disease.Cause}</Text>
                        </Text>
                        <Text style={{fontSize: SIZES.medium, marginBottom: 2, color: COLORS.graydark, fontFamily: FONTS.medium}}>Solution:</Text>
                        <View style={{width: '100%', marginBottom: 40}}>{solList}</View>
                    </Pressable>
                </ScrollView>
                {/* <View style={{flex: 1}}></View> */}
            </ImageBackground>
        </SafeAreaView>
    )
}

export default SingleDB

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
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
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: COLORS.white,
        marginHorizontal: 16,
        paddingHorizontal: 16,
        marginVertical: 50,
        paddingTop: 20,
        borderRadius: 8
    },
    titleBox: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end'
    },
    contentBox: {
        flex: 4,
        width: '100%',
        // backgroundColor: COLORS.white
    },
    mainText: {
        fontSize: SIZES.extraLarge,
        color: COLORS.primary,
        marginBottom: 10,
        fontFamily: FONTS.semiBold,
    },
    subText: {
        fontSize: SIZES.large,
        color: COLORS.secondary,
        marginBottom: 10,
        fontFamily: FONTS.medium
    },
    imgCont: {
        height: 200,
        width: '100%',
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 5,
        marginVertical: 10,
        alignItems: 'center'
    },
    cause: {
        fontSize: SIZES.medium,
        marginBottom: 10, 
        color: COLORS.graydark,
        fontFamily: FONTS.medium
    },
    causeName: {
        color: COLORS.secondary,
        fontFamily: FONTS.semiBold
    },
    image: {
        height: '100%',
        width: '50%',
    },
    ztext: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.tertiary
  }
})