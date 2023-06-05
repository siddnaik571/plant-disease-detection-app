import React from 'react'
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, FlatList, TouchableOpacity, Image, ScrollView, Pressable } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar } from '../components'
import Ionicons from '@expo/vector-icons/Ionicons'
import { collection, getDocs} from 'firebase/firestore/lite'
import { db } from './firebase/firebase-config'

const Garden2 = ({navigation}) => {
const [procedure, setProcedure]= useState([])

const following=procedure.map((item)=>{
  //console.log(item.steps[0])
  if(item.id==5)
  {
    return item.steps.map((component)=> <View key={Math.random()*200000}><Text>{component}</Text></View>)
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
        <View style={styles.header}>
        <Pressable >
        <Ionicons name='arrow-back-outline' size={30} onPress={()=>navigation.navigate('HomeScreen')} color="#708090"/>
        </Pressable>
        <Text style={styles.mainText}>Plant Care Guide</Text>
        </View>
        
        <ScrollView style={styles.secondaryContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.mainBox}>
            <View style={styles.mainContent}>
              {following}
            </View>
          </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Garden2

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
    borderBottomWidth: 1,
    borderColor: '#EBEFEC',
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
    backgroundColor: '#F7FDF8'
  },
  mainBox: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 24.5,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 24.5,
    justifyContent: 'space-between'
  }
})