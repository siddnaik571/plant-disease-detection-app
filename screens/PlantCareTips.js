import React from 'react'
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, FlatList, TouchableOpacity, Image, ScrollView, Pressable } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar, Header } from '../components'
import Ionicons from '@expo/vector-icons/Ionicons'

const PlantCareTips = ({navigation}) => {

    const [balcony,setBalcony]=useState(false)
    const [garden,setGarden]=useState(false)
    const [procedure,setProcedure]=useState(false)
    const [tip,setTip]=useState(false)

  return (
    <SafeAreaView style={styles.container}>
        <FocussedStatusBar background={COLORS.primary}/>
        <Header/>
        <ScrollView style={styles.secondaryContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.mainBox}>
                <TouchableOpacity style={styles.contBox} onPress={()=>setBalcony(prev=>!prev)}>
                    <Text style={{color: COLORS.secondary, fontFamily: FONTS.medium, fontSize: SIZES.medium}}>Balcony</Text>
                </TouchableOpacity>
                {balcony && <View style={{gap: 10, marginBottom: 10}}>
                    <TouchableOpacity style={styles.subBox} onPress={()=>navigation.push('Balcony1')}>
                        <Text>Planting Seeds</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subBox} onPress={()=>navigation.push('Balcony2')}>
                        <Text>Planting Saplings</Text>
                    </TouchableOpacity>
                </View>}
                <TouchableOpacity style={styles.contBox} onPress={()=>setGarden(prev=>!prev)}>
                    <Text style={{color: COLORS.secondary, fontFamily: FONTS.medium, fontSize: SIZES.medium}}>Garden/Backyard</Text>
                </TouchableOpacity>
                {garden && <View style={{gap: 10, marginBottom: 10}}>
                    <TouchableOpacity style={styles.subBox} onPress={()=>navigation.push('Garden1')}>
                        <Text>Planting Seeds</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subBox} onPress={()=>navigation.push('Garden2')}>
                        <Text>Planting Saplings</Text>
                    </TouchableOpacity>
                </View>}
                <TouchableOpacity style={styles.contBox} onPress={()=>setProcedure(prev=>!prev)}>
                    <Text style={{color: COLORS.secondary, fontFamily: FONTS.medium, fontSize: SIZES.medium}}>Growing plants</Text>
                </TouchableOpacity>
                {procedure && <View style={{gap: 10, marginBottom: 10}}>
                    <TouchableOpacity style={styles.subBox} onPress={()=>navigation.push('Garden1')}>
                        <Text>Planting Seeds</Text>
                    </TouchableOpacity>
                </View>}
                <TouchableOpacity style={styles.contBox} onPress={()=>setTip(prev=>!prev)}>
                    <Text style={{color: COLORS.secondary, fontFamily: FONTS.medium, fontSize: SIZES.medium}}>Tips</Text>
                </TouchableOpacity>
                {tip && <View style={{gap: 10}}>
                    <TouchableOpacity style={styles.subBox} onPress={()=>navigation.push('Tip1')}>
                        <Text>Boost Growth Rate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subBox} onPress={()=>navigation.push('Tip2')}>
                        <Text>Tips for Balcony</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subBox} onPress={()=>navigation.push('Tip3')}>
                        <Text>Tools</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subBox} onPress={()=>navigation.push('Tip4')}>
                        <Text>Planting Options</Text>
                    </TouchableOpacity>
                </View>}
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default PlantCareTips

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
    mainBox: {
        width: '100%',
        marginVertical: 20,
    },
    contBox: {
        height: 70,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center' ,
        marginVertical: 10,
        backgroundColor: '#F7FDF8',
        borderRadius: 4,
    },
    subBox: {
        height: 50,
        width: '100%',
        // borderWidth: 1,
        // borderColor: '#EBEFEC',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.graylight,
        borderRadius: 4
    },
    image: {
        height: 80,
        width: 80,
        borderRadius: 80/2
    },
    plantName: {
        marginTop: 5,
        color: '#708090'
    }
})