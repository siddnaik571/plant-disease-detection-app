import React from 'react'
import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar, QueryBox } from '../components'
import Ionicons from '@expo/vector-icons/Ionicons'

const DetectionScreen = ({navigation, route}) => {
    
    return (
        <SafeAreaView style={styles.container}>
            <FocussedStatusBar background={COLORS.primary}/>
            <View style={{height: '20%'}}></View>
            <View style={styles.secondaryContainer}>
                <Text style={styles.mainText}>Disease Detection</Text>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: route.params.imageUri }}/>
                    <View>
                        <TouchableOpacity style={styles.button1} onPress={()=>navigation.navigate('DetectionScreen2')}>
                            <Text style={{color: '#248232'}}>Detect</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button2}>
                            <Text style={{color: '#FCFFFC'}}>Go Back</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default DetectionScreen

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
    },
    image: {
        width: 240,
        height: 240
    },
    button1: {
        width: 240,
        height: 43,
        borderColor: '#248232',
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    button2: {
        width: 240,
        height: 43,
        borderRadius: 4,
        backgroundColor: '#2D3A3A',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25
    }
})