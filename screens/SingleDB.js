import React from 'react'
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, FlatList, TouchableOpacity, Image, ScrollView, Pressable } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar, QueryBox, TabBar, Header } from '../components'

const SingleDB = ({route}) => {
  let uid=0
  const solList=route.params.disease.Solution.map((sol)=><Text key={uid++}>{`\u25AA ${sol}`}</Text>)

  return (
    <SafeAreaView style={styles.container}>
        <FocussedStatusBar background={COLORS.primary}/>
        <Header/>
        <View style={styles.secondaryContainer}>
          <View style={styles.titleBox}>
              <Text style={styles.mainText}>{route.params.disease.Name}</Text>
              <Text style={styles.subText}>{route.params.disease.Plant}</Text>
          </View>
          <Pressable style={styles.contentBox}>
          <View style={styles.imgCont}></View>
              <Text style={styles.cause}>
                Cause: <Text style={styles.causeName}>{route.params.disease.Cause}</Text>
              </Text>
              <Text style={{fontSize: SIZES.medium, marginBottom: 2}}>Solution:</Text>
              {solList}
          </Pressable>
        </View>
    </SafeAreaView>
  )
}

export default SingleDB

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
        backgroundColor: '#F7FDF8',
    },
    titleBox: {
      flex: 1,
      width: '100%',
      justifyContent: 'flex-end'
    },
    contentBox: {
      flex: 4,
      color: '#0B280F',
      width: '100%',
    },
    mainText: {
      fontSize: SIZES.extraLarge,
      color: COLORS.primary,
      marginBottom: 10,
      fontFamily: FONTS.semiBold,
    },
    subText: {
      fontSize: SIZES.large,
      color: '#2BA84A',
      marginBottom: 10,
      fontFamily: FONTS.medium
    },
    imgCont: {
      height: 200,
      width: '100%',
      borderWidth: 1,
      borderRadius: 5,
      marginVertical: 10
    },
    cause: {
      fontSize: SIZES.medium,
      marginBottom: 10, 
      color: '#0B280F',
    },
    causeName: {
      color: '#2BA84A',
      fontFamily: FONTS.semiBold
    }
})