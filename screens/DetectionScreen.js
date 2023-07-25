import React from 'react'
import { Text, View, StyleSheet, Button, SafeAreaView, TouchableOpacity, Image, ActivityIndicator, ImageBackground } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar, QueryBox } from '../components'
import axios from 'axios';
import { Alert } from 'react-native';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons'

const DetectionScreen = ({navigation, route}) => {

    const [image] = React.useState(route.params.imageUri);
    const [selectedImage, setSelectedImage] = React.useState({uri:image});

    //state for ActivityIndicator
    const [loading,setLoading]=React.useState(false)
    
    const handleImageUpload = async () => {
        try {
            setLoading(true)
            if (!selectedImage) {
                Alert.alert('Please select an image');
                return;
            }
  
            const formData = new FormData();
            formData.append('file', {
                uri: selectedImage.uri,
                type: 'image/jpeg',
                name: 'image.jpg',
            });
  
            const response = await fetch('http://192.168.51.126:8080/predict', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
  
            const data = await response.json();
            console.log('Response:', data);
  
            const imageUri = image;
            setLoading(false)
            navigation.push('DetectionScreen2',{imageUri: imageUri,data: data});
      
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <FocussedStatusBar background={COLORS.primary}/>
            <ImageBackground source={{uri: 'https://firebasestorage.googleapis.com/v0/b/plantify-app-bf1df.appspot.com/o/DreamShaper_v7_light_and_bright_green_background_with_small_an_4%20(1)%201.png?alt=media&token=5c268dd1-844c-40df-9ab1-f479b573b9f3'}} style={{flex:1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.header}>
                <AntDesign name='arrowleft' size={30} color={COLORS.tertiary} onPress={()=>navigation.push('Scanner')}/>
                <Text style={styles.stext}>Disease Detection</Text>
                <View style={{width: 30, height: 30}}></View>
            </View>
            <View style={{height: '20%'}}></View>
            <View style={styles.secondaryContainer}>
                {/* <Text style={styles.mainText}>Disease Detection</Text> */}
                <View style={styles.imageContainer}>
                    {/* <Image style={styles.image} source={{ uri: route.params.imageUri }}/> */}
                    <Image style={styles.image} source={{ uri: image }}/>
                    <View>
                        {loading?<ActivityIndicator size="large" color={COLORS.tertiary} style={{marginTop: 50}}/>:
                        <TouchableOpacity style={styles.button2} onPress={handleImageUpload}>
                            <Text style={{color: COLORS.primary, fontFamily: FONTS.semiBold, fontSize: SIZES.medium}}>DETECT</Text>
                        </TouchableOpacity>}
                        {/* <TouchableOpacity style={styles.button2} onPress={()=>navigation.push('Scanner')}>
                            <Text style={{color: COLORS.white}}>Go Back</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </View>
            </ImageBackground>
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
    header:{
        height: 60,
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        // borderBottomWidth: 1,
        // borderColor: COLORS.graylight,
      },
    secondaryContainer: {
        flex: 1,
        width: '80%',
        alignItems: 'center',
    },
    mainText: {
        fontSize: SIZES.extraLarge,
        color: COLORS.tertiary,
        marginBottom: 35,
        fontFamily: FONTS.semiBold,
        textAlign: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 8
    },
    button1: {
        width: 300,
        height: 43,
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    button2: {
        width: 300,
        height: 43,
        borderRadius: 4,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    stext: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.tertiary
    }
})