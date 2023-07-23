import React from 'react'
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, FlatList, TouchableOpacity, Image, ScrollView, Pressable, ImageBackground } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar } from '../components'
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons'
import { collection, getDocs } from 'firebase/firestore/lite'
import { db } from './firebase/firebase-config'

const Balcony2 = ({navigation}) => {
    const [procedure, setProcedure]= useState([])

    const following = procedure.map((item)=>{
        if(item.id==3)
        {
            return item.steps.map((component)=> <View key={Math.random()*200000}><Text style={styles.text}>{component}</Text></View>)
        }
        return null
    })

    const GetData=async()=>{
        const disCol=collection(db,'procedure')
        const disSnapshot=await getDocs(disCol)
        const disList=disSnapshot.docs.map(doc=>doc.data())
        setProcedure(disList)
    }

    useEffect(()=>{
        GetData()
    },[])

    return (
        <SafeAreaView style={styles.container}>
            <FocussedStatusBar background={COLORS.primary}/>
            <ImageBackground source={{uri: 'https://firebasestorage.googleapis.com/v0/b/plantify-app-bf1df.appspot.com/o/DreamShaper_v7_light_and_bright_green_background_with_small_an_4%20(1)%201.png?alt=media&token=5c268dd1-844c-40df-9ab1-f479b573b9f3'}} style={{flex:1, width: '100%'}}>
            <View style={styles.header}>
                <AntDesign name='arrowleft' size={30} color={COLORS.tertiary} onPress={()=>navigation.push('PlantCareTips')}/>
                <Text style={styles.ztext}>Balcony</Text>
                <View style={{width: 30, height: 30}}></View>
            </View>
        
            <ScrollView style={styles.secondaryContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.mainBox}>
                    <View>
                        <Text style={styles.heading}>Planting Saplings</Text>
                    </View>
                    <View style={styles.imgCont}>
                        <View style={{width: '50%'}}><Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/plantify-app-bf1df.appspot.com/o/PlantCareTips%2Fcheck%20sunlight.jpg?alt=media&token=1ae68e56-b4c0-495b-ada5-0eb6f53ac3f7'}} style={styles.image} resizeMode='cover'/></View>
                        <View style={{width: '50%'}}><Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/plantify-app-bf1df.appspot.com/o/PlantCareTips%2Flarge%20pots.jpg?alt=media&token=2cb9284f-4ddf-4f5e-9910-4c94db3ffa19'}} style={styles.image} resizeMode='cover'/></View>
                    </View>
                    <View style={styles.mainContent}> 
                        {following}
                    </View>
                </View>
            </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Balcony2

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
        rowGap: 12,
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
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
        color: COLORS.tertiary
    },
    imgCont: {
        height: 200,
        width: '100%',
        // borderWidth: 1,
        // borderColor: '#D9D9D9',
        borderRadius: 10,
        marginVertical: 20,
        alignItems: 'center',
        flexDirection: 'row', 
        gap: 10
    },
    image: {
        height: '100%',
        width: '100%',
        // borderRadius: 10
    }
})