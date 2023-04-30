import React from 'react'
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar, QueryBox } from '../components'
import Ionicons from '@expo/vector-icons/Ionicons'

const DetectionScreen2 = () => {

    const [showCause,setShowCause]=useState(false)
    const [showSolution,setShowSolution]=useState(false)

    function changeCause(){
        setShowCause(prev=>!prev)
    }

    function changeSolution(){
        setShowSolution(prev=>!prev)
    }

  return (
    <SafeAreaView style={styles.container}>
        <FocussedStatusBar background={COLORS.primary}/>
        <View style={{height: '20%'}}></View>
        <View style={styles.secondaryContainer}> 
            <Text style={styles.mainText}>Disease Detection</Text>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../assets/images/DetectionImage.png')}/>
                <View style={{width: '70%',justifyContent: 'center',alignItems: 'center', marginTop: 40, marginBottom: 15}}>
                    <Text>Disease Detected</Text>
                    <Text style={styles.diseaseName}>EARLY BLIGHT</Text>
                    <Text>Potato</Text>
                </View>
                <ScrollView style={{width: '70%'}} showsVerticalScrollIndicator={false}>
                    <TouchableOpacity style={styles.button} onPress={changeCause}>
                        <Text>CAUSE</Text>
                    </TouchableOpacity>
                    {showCause && <View style={styles.info}>
                        <Text style={{textAlign: 'justify'}}>Lorem ipsum dolor sit amet, consec tetur adipiscing elit, 
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veni am, quis nostrud exercitation ullamco laboris
                             nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
                             in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                               culpa qui officia deserunt mollit anim id est laborum
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
        width: 240,
        height: 240,
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