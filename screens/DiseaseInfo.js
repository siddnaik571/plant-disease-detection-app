import React from 'react'
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, FlatList, TouchableOpacity, Image, ScrollView, Pressable } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar, QueryBox, TabBar, Header, DiseaseBox } from '../components'
import Ionicons from '@expo/vector-icons/Ionicons'
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
        <Header/>
        <ScrollView style={styles.secondaryContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.mainBox}>
            {DiseaseJSX}
          </View>
        </ScrollView>
        {/* <TabBar navigation={navigation}/> */}
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
      // backgroundColor: '#F7FDF8'
  },
  mainBox: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      rowGap: 24.5,
      marginVertical: 20,
      justifyContent: 'space-between'
  },
})