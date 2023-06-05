import React from 'react'
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar, Header } from '../components'
import Ionicons from '@expo/vector-icons/Ionicons'
import { authentication } from './firebase/firebase-config'
import * as Location from "expo-location";

const HomeScreen = ({navigation, route}) => {

    //state for refresh control
    const [refreshing, setRefreshing] = React.useState(false);
  
    //get current user
    const user=authentication.currentUser

    //states to set weather and location data
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState(null);

    //function to get location
    const getLocation = async () => {
        try {
            // Request location permission
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }

            // Get current location coordinates
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            fetchWeatherData(location.coords.latitude, location.coords.longitude);
        } catch (error) {
            console.error('Error getting location:', error);
            setErrorMessage('Error getting location: ' + error.message);
        }
    };

    //function to get weather data
    const fetchWeatherData = async (latitude,longitude) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=3d9b9b12834e4fca69c88401aeb73c2e`
            );
            const json = await response.json();
            setWeatherData(json);
        } catch (error) {
            // console.error('Error fetching weather data:', error);
        }
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getLocation()
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
    }, []);    
   
    useEffect(() => {
        getLocation()
    }, []);

    
    return (
        <SafeAreaView style={styles.container} >
            <FocussedStatusBar background={COLORS.primary}/>
            <Header/>
            <ScrollView contentContainerStyle={styles.secondaryContainer} 
                        refreshControl={<RefreshControl 
                                            refreshing={refreshing} 
                                            onRefresh={onRefresh}
                                            progressBackgroundColor={COLORS.white} 
                                            colors={[COLORS.primary]}
                                        />}
            >
                <View style={styles.textBox}>
                    <Text style={styles.subText}>Hi, {user.displayName}</Text>
                    <Text style={styles.mainText}>Find solutions on plant diseases </Text>
                </View>
                <View style={styles.mainBox}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Scanner')} style={styles.subBox}>
                            <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/plantify-app-bf1df.appspot.com/o/wired-outline-61-camera%20(1).gif?alt=media&token=7b265095-905e-4e2b-83e9-758fe098743f'}} style={styles.aicon}/>
                            <Text style={styles.boxText}>Detect</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('PlantCareTips')} style={styles.subBox}>
                            <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/plantify-app-bf1df.appspot.com/o/wired-outline-1827-growing-plant.gif?alt=media&token=5c76d203-e5f1-49a2-a304-70b9fd5a0473'}} style={styles.aicon}/>
                            <Text style={styles.boxText}>Care Tips</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('DiseaseInfo')} style={styles.subBox}>
                            <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/plantify-app-bf1df.appspot.com/o/wired-outline-19-magnifier-zoom-search.gif?alt=media&token=7ec219cd-abc5-40ca-a0e6-d2936d7678aa'}} style={styles.aicon}/>
                            <Text style={styles.boxText}>Diseases</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.weatherBox}>
                    {weatherData?
                        <View style={{width: '100%',flexDirection: 'row', justifyContent: 'space-between'}}> 
                            <View>
                                <Text style={styles.temp}>{Math.round(weatherData.main.temp-273.15)}°C</Text>
                                <View style={{flexDirection: 'row', gap: 3, alignItems: 'center'}}>
                                    <Ionicons name='location-sharp' size={18} color={COLORS.tertiary}/>
                                    <Text style={styles.loc}>{weatherData.name}</Text>
                                </View>
                                {/* <Text style={styles.loc}>{weatherData.weather[0].description}</Text> */}
                            </View>
                            <Image style={styles.wimage} source={{uri: `https://firebasestorage.googleapis.com/v0/b/plantify-app-bf1df.appspot.com/o/${weatherData.weather[0].main}.png?alt=media`}} resizeMode='contain'/>
                        </View>:<ActivityIndicator size={'large'} color={COLORS.secondary}/>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
  )
}

export default HomeScreen

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
        // backgroundColor: '#F7FDF8'
    },
    mainBox: {
        height: 120,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    subBox: {
        height: '100%',
        width: '31%',
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        backgroundColor: '#F7FDF8',
    },
    boxText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.medium,
        color: COLORS.secondary
    },
    weatherBox: {
        height: 150,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 7,
        marginVertical: 30,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#EBEFEC'
    },
    temp: {
        fontSize: 40,
        color: COLORS.primary
    }, 
    loc: {
        color: COLORS.tertiary
    },
    textBox: {
        marginBottom: 50,
        width: '100%',
    },
    mainText: {
        fontSize: SIZES.extraLarge,
        fontFamily: FONTS.semiBold,
        color: COLORS.secondary,
        maxWidth: '70%'
    },
    subText: {
        fontSize: SIZES.large,
        fontFamily: FONTS.medium,
        // color: '#99A0A7',
        color:  COLORS.tertiary,
        marginBottom:  7
    },
    pattern: {
        width: '75%',
        height:  '50%',
        backgroundColor: '#288F37',
        position: 'absolute',
        right: 0,
        top: 0,
        borderRadius: 90,
        borderTopRightRadius: 7,
        borderTopLeftRadius: 0,
        borderBottomRightRadius: 0
    }, 
    wimage: {
        height: 80,
        width: 80
    },
    aicon: {
        width: 60,
        height: 60
    }
})