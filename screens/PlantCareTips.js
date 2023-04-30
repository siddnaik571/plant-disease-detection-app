import React from 'react'
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, FlatList, TouchableOpacity, Image, ScrollView, Pressable } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar, QueryBox, TabBar, Header } from '../components'
import Ionicons from '@expo/vector-icons/Ionicons'

const PlantCareTips = ({navigation}) => {

  return (
    <SafeAreaView style={styles.container}>
        <FocussedStatusBar background={COLORS.primary}/>
        <Header/>
        <ScrollView style={styles.secondaryContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.mainBox}>
                <TouchableOpacity style={styles.contBox} onPress={()=>navigation.navigate('SinglePCT')}>
                    <View style={styles.subBox}>
                    <Image style={styles.image} source={require('../assets/images/Plants/Plant2.png')}/>
                    </View>
                    <Text style={styles.plantName}>Tomato</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contBox} onPress={()=>navigation.navigate('SinglePCT')}>
                    <View style={styles.subBox}>
                    <Image style={styles.image} source={require('../assets/images/Plants/Plant7.png')}/>
                    </View>
                    <Text style={styles.plantName}>Strawberry</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contBox} onPress={()=>navigation.navigate('SinglePCT')}>
                    <View style={styles.subBox}>
                    <Image style={styles.image} source={require('../assets/images/Plants/Plant8.png')}/>
                    </View>
                    <Text style={styles.plantName}>Squash</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contBox} onPress={()=>navigation.navigate('SinglePCT')}>
                    <View style={styles.subBox}>
                    <Image style={styles.image} source={require('../assets/images/Plants/Plant11.png')}/>
                    </View>
                    <Text style={styles.plantName}>Potato</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contBox} onPress={()=>navigation.navigate('SinglePCT')}>
                    <View style={styles.subBox}>
                    <Image style={styles.image} source={require('../assets/images/Plants/Plant3.png')}/>
                    </View>
                    <Text style={styles.plantName}>Pepper Bell</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contBox} onPress={()=>navigation.navigate('SinglePCT')}>
                    <View style={styles.subBox}>
                    <Image style={styles.image} source={require('../assets/images/Plants/Plant10.png')}/>
                    </View>
                    <Text style={styles.plantName}>Peach</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contBox} onPress={()=>navigation.navigate('SinglePCT')}>
                    <View style={styles.subBox}>
                    <Image style={styles.image} source={require('../assets/images/Plants/Plant1.png')}/>
                    </View>
                    <Text style={styles.plantName}>Orange</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contBox} onPress={()=>navigation.navigate('SinglePCT')}>
                    <View style={styles.subBox}>
                    <Image style={styles.image} source={require('../assets/images/Plants/Plant4.png')}/>
                    </View>
                    <Text style={styles.plantName}>Grapes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contBox} onPress={()=>navigation.navigate('SinglePCT')}>
                    <View style={styles.subBox}>
                    <Image style={styles.image} source={require('../assets/images/Plants/Plant5.png')}/>
                    </View>
                    <Text style={styles.plantName}>Corn</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contBox} onPress={()=>navigation.navigate('SinglePCT')}>
                    <View style={styles.subBox}>
                    <Image style={styles.image} source={require('../assets/images/Plants/Plant9.png')}/>
                    </View>
                    <Text style={styles.plantName}>Cherry</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contBox} onPress={()=>navigation.navigate('SinglePCT')}>
                    <View style={styles.subBox}>
                        <Image style={styles.image} source={require('../assets/images/Plants/Plant6.png')}/>
                    </View>
                    <Text style={styles.plantName}>Apple</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        <TabBar navigation={navigation}/>
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
        backgroundColor: '#F7FDF8'
    },
    mainBox: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 24.5,
        marginVertical: 40
    },
    contBox: {
        height: 110,
        width: 110,
        alignItems: 'center',
        justifyContent: 'center' ,
    },
    subBox: {
        height: 90,
        width: 90,
        borderRadius: 90/2,
        // borderWidth: 1,
        // borderColor: '#EBEFEC',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
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