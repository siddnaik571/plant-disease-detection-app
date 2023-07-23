import React from 'react'
import { Text, View, StyleSheet, SafeAreaView, Pressable, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar } from '../components'
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons'

const Help3 = ({navigation}) => {

    return (
        <SafeAreaView style={styles.container}>
            <FocussedStatusBar background={COLORS.primary}/>
            <ImageBackground source={{uri: 'https://firebasestorage.googleapis.com/v0/b/plantify-app-bf1df.appspot.com/o/DreamShaper_v7_light_and_bright_green_background_with_small_an_4%20(1)%201.png?alt=media&token=5c268dd1-844c-40df-9ab1-f479b573b9f3'}} style={{flex:1, width: '100%'}}>
                <View style={styles.header}>
                    <AntDesign name='arrowleft' size={30} color={COLORS.tertiary} onPress={()=>navigation.push('Help')}/>
                    <Text style={styles.ztext}>Help</Text>
                    <View style={{width: 30, height: 30}}></View>
                </View>
        
                <ScrollView style={styles.secondaryContainer} showsVerticalScrollIndicator={false}>
                    <View style={styles.mainBox}>
                        <View>
                        <Text style={styles.heading}>How to use Plant Care</Text>
                    </View>
                    <View style={styles.mainContent}>
                        <Text style={styles.text}><Text style={{fontFamily: FONTS.semiBold}}>STEP 1:</Text> Click on the Plant Care Guide icon in home screen.</Text>
                        <Text style={styles.text}><Text style={{fontFamily: FONTS.semiBold}}>STEP 2:</Text> Four options are available. Click on the desired option.</Text>
                        <Text style={styles.text}><Text style={{fontFamily: FONTS.semiBold}}>STEP 3:</Text> Balcony options consists of two sub-options which are growing 
                            plants from seeds and growing plants from saplings. Each sub-option has 
                            detailed step by step procedure.</Text>
                        <Text style={styles.text}><Text style={{fontFamily: FONTS.semiBold}}>STEP 4:</Text> Garden/Backyard option displays two sub-options which are growing 
                            plants from seeds and growing plants from saplings. Each sub-option has 
                            detailed step by step procedure.</Text>
                        <Text style={styles.text}><Text style={{fontFamily: FONTS.semiBold}}>STEP 5:</Text> Growing plants option displays detailed step by step procedure 
                            for growing plants.</Text>
                        <Text style={styles.text}><Text style={{fontFamily: FONTS.semiBold}}>STEP 6:</Text> Tips option shows four options which are Boost Growth Rate, 
                            Tips for Balcony, Tools and Planting Options.</Text>
                        <Text style={styles.text}><Text style={{fontFamily: FONTS.semiBold}}>STEP 7:</Text> Boost Growth Rate option displays tips in order to boost 
                            the growth rate of plants.</Text>
                        <Text style={styles.text}><Text style={{fontFamily: FONTS.semiBold}}>STEP 8:</Text> Tips for Balcony option displays tips for growing plants in balcony.</Text>
                        <Text style={styles.text}><Text style={{fontFamily: FONTS.semiBold}}>STEP 9:</Text> Tools option displays different types of tools which are used for planting.</Text>
                        <Text style={styles.text}><Text style={{fontFamily: FONTS.semiBold}}>STEP 10:</Text> Planting option displays different types of plants that can be grown.</Text>
                    </View>
                </View>
            </ScrollView>
            </ImageBackground>
        </SafeAreaView>
      )
}

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
        // borderBottomWidth: 1,
        // borderColor: '#EBEFEC',
    },
    heading: {
        fontSize: SIZES.extraLarge,
        color: COLORS.primary,
        marginBottom: 10,
        fontFamily: FONTS.semiBold,
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
    },
    mainBox: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: 10,
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
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        rowGap: 12,
        backgroundColor: COLORS.white,
        justifyContent: 'space-between',
        padding: 20,
        borderRadius: 8,
        marginBottom: 20
    },
    ztext: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.tertiary
    },
    text: {
        color: COLORS.tertiary
    }
})

export default Help3