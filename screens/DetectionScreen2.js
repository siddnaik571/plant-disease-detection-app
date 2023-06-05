import React from 'react'
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar, QueryBox } from '../components'
import Ionicons from '@expo/vector-icons/Ionicons'
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

  return (
    <SafeAreaView style={styles.container}>
        <FocussedStatusBar background={COLORS.primary}/>
        <View style={styles.header}>
          <Ionicons name='arrow-back-outline' size={30} color={COLORS.graydark} onPress={()=>navigation.push('Scanner')}/>
          {/* <Ionicons name='settings-outline' size={20} color={COLORS.graydark}/> */}
        </View>
        <View style={{height: '10%'}}></View>
        <View style={styles.secondaryContainer}> 
            <Text style={styles.mainText}>Disease Detection</Text>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: imageUri}}/>
                <View style={{width: '70%',justifyContent: 'center',alignItems: 'center', marginTop: 40, marginBottom: 15}}>
                    <Text>Disease Detected</Text>
                    <Text style={styles.diseaseName}>{data.class}</Text>
                    <Text>Potato</Text>
                </View>
                <ScrollView style={{width: '70%'}} showsVerticalScrollIndicator={false}>
                    <TouchableOpacity style={styles.button} onPress={changeCause}>
                        <Text>CAUSE</Text>
                    </TouchableOpacity>
                    {showCause && <View style={styles.info}>
                        <Text style={{textAlign: 'justify'}}>
                            {obj.Cause}
                        </Text>
                    </View>}
                    <TouchableOpacity style={styles.button} onPress={changeSolution}>
                        <Text>SOLUTION</Text>
                    </TouchableOpacity>
                    {showSolution && <View style={styles.info}>
                        <Text style={{textAlign: 'justify'}}>Lorem ipsum dolor sit amet, consec tetur adipiscing elit, 
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veni am, quis nostrud exercitation ullamco laboris
                             nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
                             in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                               culpa qui officia deserunt mollit anim id est laborum
                        </Text>
                    </View>}
                </ScrollView>
            </View>
        </View>
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
        borderBottomWidth: 1,
        borderColor: COLORS.graylight,
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
    },
    button: {
        width: 150,
        height: 30,
        borderColor: '#248232',
        borderWidth: 1,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        alignSelf: 'center'
    },
    info: {
        marginTop: 10
    },
    diseaseName: {
        color: '#2BA84A',
        fontSize: SIZES.medium,
        fontFamily: FONTS.semiBold
    }
})