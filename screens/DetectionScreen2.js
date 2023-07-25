import React from 'react'
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, FlatList, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar, QueryBox } from '../components'
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons'
import { collection, getDocs, doc, setDoc, where, query, getDoc } from 'firebase/firestore/lite'
import { db } from './firebase/firebase-config'

const DetectionScreen2 = ({navigation, route}) => {

    const {imageUri,data} = route.params;

    const [obj,setObj]=useState({})

    const [showCause,setShowCause]=useState(false)
    const [showSolution,setShowSolution]=useState(false)

    const GetData=async()=>{
        const q = query(collection(db, "Diseases"), where("Name", "==", data.class), where("Plant", "==", "Potato"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setObj(doc.data())
        });
        // if(querySnapshot.exists()){
        //     console.log(querySnapshot.data())
        // }else{
        //     console.log("L")
        // }

    }

    useEffect(()=>{
        GetData()
      },[])

    function changeCause(){
        setShowCause(prev=>!prev)
    }

    function changeSolution(){
        setShowSolution(prev=>!prev)
    }

    let isDiseased
    if(data.class==="Healthy"||data.class==="NonLeaves"){
        isDiseased=false
    }else{
        isDiseased=true
    }

    return (
        <SafeAreaView style={styles.container}>
            <FocussedStatusBar background={COLORS.primary}/>
            <ImageBackground source={{uri: 'https://firebasestorage.googleapis.com/v0/b/plantify-app-bf1df.appspot.com/o/DreamShaper_v7_light_and_bright_green_background_with_small_an_4%20(1)%201.png?alt=media&token=5c268dd1-844c-40df-9ab1-f479b573b9f3'}} style={{flex:1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.header}>
                    <AntDesign name='arrowleft' size={30} color={COLORS.tertiary} onPress={()=>navigation.push('Scanner')}/>
                    <Text style={styles.stext}>Disease Detection</Text>
                    <View style={{width: 30, height: 30}}></View>
                </View>
                <View style={{height: '20%'}}></View>
                <View style={styles.secondaryContainer}> 
                    {/* <Text style={styles.mainText}>Disease Detection</Text> */}
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{uri: imageUri}}/>
                        <View style={{width: '70%',justifyContent: 'center',alignItems: 'center', marginTop: 40, marginBottom: 15, gap: 5}}>
                            {isDiseased?<Text style={{color: COLORS.graylight, fontSize: SIZES.medium}}>Disease Detected</Text>:<Text style={{color: COLORS.graylight, fontSize: SIZES.medium}}>Disease Not 
                            Detected</Text>}
                            <Text style={styles.diseaseName}>{data.class}</Text>
                            {isDiseased && <Text style={{color: COLORS.tertiary, fontSize: SIZES.large, fontFamily: FONTS.semiBold}}>Potato</Text>}
                        </View>
                        <ScrollView style={{width: '70%'}} showsVerticalScrollIndicator={false}>
                            {isDiseased && <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('SingleDB', {disease: obj, dimg: imageUri, returnTo: 'HomeScreen'})}>
                            <Text style={{color: COLORS.secondary, fontFamily: FONTS.semiBold}}>MORE INFO</Text>
                            <Ionicons name='chevron-forward' size={20} color={COLORS.grayneutral}/>
                            </TouchableOpacity>}
                            {showCause && <View style={styles.info}>
                            <Text style={{textAlign: 'justify'}}>
                            {obj.Cause}
                        </Text>
                    </View>}
                </ScrollView>
            </View>
        </View>
        </ImageBackground>
    </SafeAreaView>
  )
}

export default DetectionScreen2

const styles = StyleSheet.create({
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
        flex: 1,
        width: '80%',
        alignItems: 'center',
    },
    mainText: {
        fontSize: SIZES.extraLarge,
        color: '#2BA84A',
        marginBottom: 35,
        fontFamily: FONTS.semiBold,
        textAlign: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 8
    },
    button: {
        width: 170,
        height: 40,
        backgroundColor: COLORS.white,
        // borderWidth: 1,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        alignSelf: 'center',
        gap: 7
    },
    info: {
        marginTop: 10
    },
    diseaseName: {
        color: COLORS.white,
        fontSize: SIZES.extraLarge,
        fontFamily: FONTS.semiBold
    },
    stext: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.tertiary
    }
})