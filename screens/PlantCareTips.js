import React from 'react'
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, FlatList, TouchableOpacity, Image, ScrollView, Pressable, ImageBackground } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar, Header } from '../components'
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons'

const PlantCareTips = ({navigation}) => {

    const [balcony,setBalcony]=useState(false)
    const [garden,setGarden]=useState(false)
    const [procedure,setProcedure]=useState(false)
    const [tip,setTip]=useState(false)

  return (
    <SafeAreaView style={styles.container}>
        <FocussedStatusBar background={COLORS.primary}/>
        <ImageBackground source={{uri: 'https://firebasestorage.googleapis.com/v0/b/plantify-app-bf1df.appspot.com/o/DreamShaper_v7_light_and_bright_green_background_with_small_an_4%20(1)%201.png?alt=media&token=5c268dd1-844c-40df-9ab1-f479b573b9f3'}} style={{flex:1, width: '100%'}}>
        <View style={styles.header}>
            <AntDesign name='arrowleft' size={30} color={COLORS.tertiary} onPress={()=>navigation.push('HomeScreen')}/>
            <Text style={styles.ztext}>Care Tips</Text>
            <View style={{width: 30, height: 30}}></View>
        </View>
        <ScrollView style={styles.secondaryContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.mainBox}>
                <TouchableOpacity style={styles.contBox} onPress={()=>setBalcony(prev=>!prev)}>
                    <View style={styles.image}><Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/plantify-app-bf1df.appspot.com/o/balcony.png?alt=media&token=54eefdb1-f423-4da6-8f08-b5704f3a8ef0'}} style={styles.aicon}/></View>
                    <View style={styles.side}>
                        <Text style={styles.mtext}>Balcony</Text>
                        <Text style={styles.stext}>Create a thriving balcony garden with these essential tips</Text>
                    </View>
                </TouchableOpacity>
                {balcony && <View style={{gap: 10, marginBottom: 10}}>
                    <TouchableOpacity style={styles.subBox} onPress={()=>navigation.push('Balcony1')}>
                        <Text style={styles.option}>Planting Seeds</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subBox} onPress={()=>navigation.push('Balcony2')}>
                        <Text style={styles.option}>Planting Saplings</Text>
                    </TouchableOpacity>
                </View>}
                <TouchableOpacity style={styles.contBox} onPress={()=>setGarden(prev=>!prev)}>
                    <View style={styles.image}><Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/plantify-app-bf1df.appspot.com/o/gardening.png?alt=media&token=58495241-16b1-4c68-9507-e0ac51a8ab3d'}} style={styles.aicon}/></View>
                    <View style={styles.side}>
                        <Text style={styles.mtext}>Garden/Backyard</Text>
                        <Text style={styles.stext}>Tips to ransform your garden or backyard into a lush paradise</Text>
                    </View>
                </TouchableOpacity>
                {garden && <View style={{gap: 10, marginBottom: 10}}>
                    <TouchableOpacity style={styles.subBox} onPress={()=>navigation.push('Garden1')}>
                        <Text style={styles.option}>Planting Seeds</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subBox} onPress={()=>navigation.push('Garden2')}>
                        <Text style={styles.option}>Planting Saplings</Text>
                    </TouchableOpacity>
                </View>}
                <TouchableOpacity style={styles.contBox} onPress={()=>setProcedure(prev=>!prev)}>
                    <View style={styles.image}><Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/plantify-app-bf1df.appspot.com/o/orchard.png?alt=media&token=71d25ce2-3d53-412e-845f-32446cc4225a'}} style={styles.aicon}/></View>
                    <View style={styles.side}>
                        <Text style={styles.mtext}>Growing plants</Text>
                        <Text style={styles.stext}>Unlock the secrets of successful plant growth with essential tips</Text>
                    </View>
                </TouchableOpacity>
                {procedure && <View style={{gap: 10, marginBottom: 10}}>
                    <TouchableOpacity style={styles.subBox} onPress={()=>navigation.push('Procedure1')}>
                        <Text style={styles.option}>Planting Seeds</Text>
                    </TouchableOpacity>
                </View>}
                <TouchableOpacity style={styles.contBox} onPress={()=>setTip(prev=>!prev)}>
                    <View style={styles.image}><Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/plantify-app-bf1df.appspot.com/o/lightbulb.png?alt=media&token=1c16f739-50b7-497d-8686-416de36374d0'}} style={styles.aicon}/></View>
                    <View style={styles.side}>
                        <Text style={styles.mtext}>Tips</Text>
                        <Text style={styles.stext}>Elevate your gardening skills with these general tips</Text>
                    </View>
                </TouchableOpacity>
                {tip && <View style={{gap: 10}}>
                    <TouchableOpacity style={styles.subBox} onPress={()=>navigation.push('Tip1')}>
                        <Text style={styles.option}>Boost Growth Rate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subBox} onPress={()=>navigation.push('Tip2')}>
                        <Text style={styles.option}>Tips for Balcony</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subBox} onPress={()=>navigation.push('Tip3')}>
                        <Text style={styles.option}>Tools</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subBox} onPress={()=>navigation.push('Tip4')}>
                        <Text style={styles.option}>Planting Options</Text>
                    </TouchableOpacity>
                </View>}
            </View>
        </ScrollView>
        </ImageBackground>
    </SafeAreaView>
  )
}

export default PlantCareTips

const styles = StyleSheet.create({
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
    mainBox: {
        width: '100%',
        marginVertical: 20,
    },
    contBox: {
        height: 120,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center' ,
        flex: 1,
        marginVertical: 10,
        // backgroundColor: '#F7FDF8',
        backgroundColor: COLORS.white,
        borderRadius: 8,
        // borderWidth: 1,
        // borderColor: COLORS.tertiary,
        gap: 12
    },
    mtext: {
        color: COLORS.tertiary, 
        fontFamily: FONTS.semiBold, 
        fontSize: SIZES.large
    },
    side: {
        flex: 4,
        paddingRight: 20
    },
    stext: {
        color: COLORS.graydark
    },
    subBox: {
        height: 50,
        width: '100%',
        // borderWidth: 1,
        // borderColor: '#EBEFEC',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.graylight,
        borderRadius: 4
    },
    image: {
        height: 80,
        width: 80,
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    plantName: {
        marginTop: 5,
        color: '#708090'
    },
    aicon: {
        width: 80,
        height: 80
    },
    ztext: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.tertiary
    },
    option: {
        color: COLORS.tertiary,
        fontFamily: FONTS.medium,
        fontSize: SIZES.medium
    }
})