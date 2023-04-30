import React from 'react'
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, FlatList, TouchableOpacity, Image, ScrollView, Pressable } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
const DiseaseBox = (props) => {

  const dis='Potato_EarlyBlight.jpeg'
  let im='../assets/images/Diseases/'+dis

  const [imagePath,setImagePath]=useState('')

  useEffect(()=>{
    console.log(imagePath==false)
    const diseaz=props.disease.image
    setImagePath('../assets/images/Diseases/'+diseaz)
  },[])

  return (
    <TouchableOpacity style={styles.contBox} onPress={()=>props.navigation.navigate('SingleDB', {key: props.disease.id, disease: props.disease})}>
        <View style={styles.upperBox}>
          {imagePath==false?<Image source={require(im)} style={styles.image}/>:null}
        </View>
        {/* {console.log(`../assets/images/Diseases/${props.disease.image}`)} */}
        <View style={styles.bottomBar}>
            <View style={styles.diseaseNameDiv}>
              <Text style={styles.diseaseName}>{props.disease.Name}</Text>
            </View>
            <Text>{props.disease.Plant}</Text>
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
        borderColor: '#D9D9D9'
    },
    bottomBar: {
      height: '25%',
      // borderTopWidth: 1,
      // borderColor: '#D9D9D9',
      width: '100%',
      alignSelf: 'flex-end',
      borderBottomEndRadius: 5,
      borderBottomLeftRadius: 5,
      paddingHorizontal: 4,
      paddingVertical: 2,
      backgroundColor: 'white'
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
      color: '#248232'
    },
    image: {
      height: '100%',
      width: '100%',
      borderRadius: 5,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    }
})