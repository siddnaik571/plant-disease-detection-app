import React from 'react'
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, FlatList, TouchableOpacity, Image, ScrollView, Pressable } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar, QueryBox, TabBar, Header } from '../components'
import Ionicons from '@expo/vector-icons/Ionicons'
import { collection, getDocs, doc, setDoc } from 'firebase/firestore/lite'
import { authentication } from './firebase/firebase-config'
import { db } from './firebase/firebase-config'

const SinglePCT = ({route}) => {

  const [plant, setPlant]=useState({})

  const getData=async()=>{
    const disCol=collection(db,'Diseases')
    const disSnapshot=await getDocs(disCol)
    const disList=disSnapshot.docs.map(doc=>doc.data())
    setPlant(disList[0])
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <SafeAreaView style={styles.container}>
        <FocussedStatusBar background={COLORS.primary}/>
        <Header/>
        <View style={styles.secondaryContainer}>
          <View style={styles.titleBox}>
            <Text style={styles.mainText}>Apple</Text>
          </View>
          <Pressable style={styles.contentBox}>
            <Text>{plant.Plant}</Text>
            <Text>{plant.Name}</Text>
          </Pressable>
        </View>
    </SafeAreaView>
  )
}

export default SinglePCT

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondaryContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 16,
    },
    titleBox: {
      flex: 1,
      width: '100%',
      justifyContent: 'flex-end'
    },
    contentBox: {
      flex: 4,
      width: '100%',
      backgroundColor: 'pink'
    },
    mainText: {
      fontSize: SIZES.extraLarge,
      color: '#2BA84A',
      marginBottom: 35,
      fontFamily: FONTS.semiBold
    },
})