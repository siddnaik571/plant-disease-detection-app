import React from 'react'
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, FlatList, TouchableOpacity, Image, ScrollView, Pressable, ImageBackground } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar, QueryBox, TabBar, Header, DiseaseBox } from '../components'
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons'
import { collection, getDocs, doc, setDoc } from 'firebase/firestore/lite'
import { authentication } from './firebase/firebase-config'
import { db } from './firebase/firebase-config'

const DiseaseInfo = ({navigation}) => {

    //state to store the array of diseases
    const [diseases, setDiseases]=useState([])

    //function to get list of diseases from firestore database
    const GetData=async()=>{
      const disCol=collection(db,'Diseases')
      const disSnapshot=await getDocs(disCol)
      const disList=disSnapshot.docs.map(doc=>doc.data())
      setDiseases(disList)
    }

    //map over diseases array to create list of JSX elements
    const DiseaseJSX=diseases.map((disease)=>{
      return <DiseaseBox key={disease.id} disease={disease} navigation={navigation}/>
    })

    useEffect(()=>{
      GetData()
    },[])

    return (
        <SafeAreaView style={styles.container}>
            <FocussedStatusBar background={COLORS.primary}/>
            <ImageBackground source={{uri: 'https://firebasestorage.googleapis.com/v0/b/plantify-app-bf1df.appspot.com/o/DreamShaper_v7_light_and_bright_green_background_with_small_an_4%20(1)%201.png?alt=media&token=5c268dd1-844c-40df-9ab1-f479b573b9f3'}} style={{width: '100%', flex: 1}}>
            <View style={styles.header}>
                <AntDesign name='arrowleft' size={30} color={COLORS.tertiary} onPress={()=>navigation.push('HomeScreen')}/>
                <Text style={styles.stext}>Diseases</Text>
                <View style={{width: 30, height: 30}}></View>
            </View>
            <ScrollView style={styles.secondaryContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.mainBox}>
                    {DiseaseJSX}
                </View>
            </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default DiseaseInfo

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
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: 24.5,
        marginVertical: 20,
        justifyContent: 'space-between'
    },
    stext: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.tertiary
    }
})