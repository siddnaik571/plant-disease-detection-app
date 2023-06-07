import React from 'react'
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, FlatList, TouchableOpacity, Image, ScrollView, Pressable } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
const DiseaseBox = (props) => {

  return (
    <TouchableOpacity style={styles.contBox} onPress={()=>props.navigation.navigate('SingleDB', {key: props.disease.id, disease: props.disease, dimg: props.disease.img})}>
        <View style={styles.upperBox}>
          <Image source={{uri: props.disease.img}} style={styles.image}/>
        </View>
        <View style={styles.bottomBar}>
            <View style={styles.diseaseNameDiv}>
              <Text style={styles.diseaseName}>{props.disease.Name}</Text>
            </View>
            <Text style={{color: COLORS.graydark}}>{props.disease.Plant}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default DiseaseBox

const styles = StyleSheet.create({
    contBox: {
        height: 210,
        width: '47%',
        alignItems: 'center',
        justifyContent: 'center' ,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: COLORS.graylight
    },
    bottomBar: {
      height: '25%',
      width: '100%',
      alignSelf: 'flex-end',
      borderBottomEndRadius: 5,
      borderBottomLeftRadius: 5,
      paddingHorizontal: 4,
      paddingVertical: 2,
      // backgroundColor: 'white'
    },
    upperBox: {
      height: '75%',
      width: '100%'
    },
    diseaseNameDiv: {
      height: '45%', 
    },
    diseaseName: {
      fontSize: SIZES.medium,
      fontFamily: FONTS.medium,
      color: COLORS.primary
    },
    image: {
      height: '100%',
      width: '100%',
      borderRadius: 5,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    }
})