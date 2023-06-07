import React from 'react'
import { Text, View, StyleSheet, Button, SafeAreaView, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar, QueryBox } from '../components'
import axios from 'axios';
import { Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'

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
  
            const response = await fetch('http://192.168.154.126:8080/predict', {
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
            <View style={styles.header}>
                <Ionicons name='arrow-back-outline' size={30} color={COLORS.graydark} onPress={()=>navigation.push('Scanner')}/>
                {/* <Ionicons name='settings-outline' size={20} color={COLORS.graydark}/> */}
            </View>
            <View style={{height: '10%'}}></View>
            <View style={styles.secondaryContainer}>
                <Text style={styles.mainText}>Disease Detection</Text>
                <View style={styles.imageContainer}>
                    {/* <Image style={styles.image} source={{ uri: route.params.imageUri }}/> */}
                    <Image style={styles.image} source={{ uri: image }}/>
                    <View>
                        {loading?<ActivityIndicator size="large" color={COLORS.secondary} style={{marginTop: 50}}/>:
                        <TouchableOpacity style={styles.button2} onPress={handleImageUpload}>
                            <Text style={{color: COLORS.white}}>Detect</Text>
                        </TouchableOpacity>}
                        {/* <TouchableOpacity style={styles.button2} onPress={()=>navigation.push('Scanner')}>
                            <Text style={{color: COLORS.white}}>Go Back</Text>
                        </TouchableOpacity> */}
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
        borderBottomWidth: 1,
        borderColor: COLORS.graylight,
      },
    secondaryContainer: {
        flex: 1,
        width: '80%',
        alignItems: 'center',
    },
    mainText: {
        fontSize: SIZES.extraLarge,
        color: COLORS.secondary,
        marginBottom: 35,
        fontFamily: FONTS.semiBold,
        textAlign: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 300,
        height: 300
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
        backgroundColor: COLORS.tertiary,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    }
})