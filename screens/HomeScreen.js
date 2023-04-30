import React from 'react'
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, FlatList, TouchableOpacity, Image, ScrollView, Pressable, ActivityIndicator, PermissionsAndroid } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar, QueryBox, TabBar, Header, SideMenu } from '../components'
import Ionicons from '@expo/vector-icons/Ionicons'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { authentication } from './firebase/firebase-config'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import * as Location from "expo-location";

const HomeScreen = ({navigation, route}) => {
  
    const [sideMenuState,setSideMenuState]=useState(false)

    const changeSideMenuState=()=>{
        setSideMenuState(prev=>!prev)
    }

    //
    const user=authentication.currentUser

    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState(null);

    //
    
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
            console.log(location.coords.latitude)
            fetchWeatherData(location.coords.latitude, location.coords.longitude);
        } catch (error) {
            console.error('Error getting location:', error);
            setErrorMessage('Error getting location: ' + error.message);
        }
    };

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

    
    useEffect(() => {
        getLocation()
    }, []);

    const path='../assets/images/sunny.png'

    return (
    <SafeAreaView style={styles.container}>
        <FocussedStatusBar background={COLORS.primary}/>
        <Header changeSideMenuState={changeSideMenuState}/>
        {sideMenuState && <SideMenu/>}
        <Pressable style={styles.secondaryContainer} onPress={changeSideMenuState}>
            <View style={styles.textBox}>
                <Text style={styles.subText}>Hi, {user.displayName}</Text>
                <Text style={styles.mainText}>Find solutions on plant diseases </Text>
            </View>
            <View style={styles.mainBox}>
                <TouchableOpacity onPress={()=>navigation.navigate('Scanner')} style={styles.subBox}>
                <View style={styles.pattern}></View>
                    <View>
                        <Text style={styles.boxText}>Detect</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('PlantCareTips')} style={styles.subBox}>
                    <View style={styles.pattern}></View>
                    <View>
                        <Text style={styles.boxText}>Plant Care Tips</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('DiseaseInfo')} style={styles.subBox}>
                <View style={styles.pattern}></View>
                    <View>
                        <Text style={styles.boxText}>Disease Info</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.weatherBox}>
                {weatherData?<View>
                    <Text style={styles.temp}>{Math.round(weatherData.main.temp-273.15)}°C</Text>
                    <View style={{flexDirection: 'row', gap: 3, alignItems: 'center'}}>
                        <Ionicons name='location-sharp' size={18} color={'#99A0A7'}/>
                        <Text style={styles.loc}>{weatherData.name}</Text>
                        <Text style={styles.loc}>{weatherData.weather[0].id}</Text>
                        {/* <Text>{weatherData.weather[0].description}</Text> */}
                    </View>
                </View>:<ActivityIndicator size="large" color={COLORS.primary} />}
                <Image style={styles.wimage} source={require(path)}/>
            </View>
        </Pressable>
        <TabBar navigation={navigation}/>
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
        height: 180,
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
        backgroundColor: COLORS.primary,

    },
    boxText: {
        fontFamily: FONTS.medium,
        color: '#EBEFEC'
    },
    weatherBox: {
        height: 150,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        // color: '#708090'
        color: '#822724'
    }, 
    loc: {
        color: '#99A0A7'
    },
    textBox: {
        marginBottom: 50,
        width: '100%',
    },
    mainText: {
        fontSize: SIZES.extraLarge,
        fontFamily: FONTS.semiBold,
        color: COLORS.primary,
        maxWidth: '70%'
    },
    subText: {
        fontSize: SIZES.large,
        fontFamily: FONTS.medium,
        // color: '#99A0A7',
        color:  '#822724',
        marginBottom:  7
    },
    pattern: {
        width: '70%',
        height:  '40%',
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
    }
})