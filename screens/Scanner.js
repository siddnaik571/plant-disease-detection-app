import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { Camera, FlashMode } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons'
import { COLORS, FONTS, SIZES } from '../constants'

const Scanner=({ navigation })=> {
  
    //state to store permission to use camera
    const [cameraPermission, setCameraPermission] = useState(null);

    //state to store permission to access gallery
    const [galleryPermission, setGalleryPermission] = useState(null);

    const [camera, setCamera] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash,setFlash]=useState(FlashMode.off)

    const permisionFunction = async () => {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        setCameraPermission(cameraPermission.status === 'granted');

        const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
        setGalleryPermission(imagePermission.status === 'granted');

        if (imagePermission.status !== 'granted' && cameraPermission.status !== 'granted')
        {
            alert('Permission for media access needed.');
        }
    };

    useEffect(() => {
        permisionFunction();
    }, []);

    const takePicture = async () => {
        if (camera) {
            let data = await camera.takePictureAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect: [1, 1],
                quality: 1,
            });
        
            setImageUri(data.uri);

            // navigation.push('DetectionScreen', {imageUri: data.uri})
            navigation.push('MainTabs',{
                screen: 'Tab1',
                params: {
                  screen: 'DetectionScreen',
                  params: {
                    imageUri: data.uri
                  }
                }
            })
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        // console.log(result);
        if (!result.canceled) {
            setImageUri(result.assets[0].uri);

            //result.uri
            // navigation.push('DetectionScreen', {imageUri: result.assets[0].uri})
            navigation.push('MainTabs',{
                screen: 'Tab1',
                params: {
                  screen: 'DetectionScreen',
                  params: {
                    imageUri: result.assets[0].uri
                  }
                }
            })
        }
    };

    const changeFlashState=()=>{
        if(flash===FlashMode.off){
            setFlash(FlashMode.on)
        }else{
            setFlash(FlashMode.off)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.cameraContainer}>
                <Camera
                    ref={(ref) => setCamera(ref)}
                    style={styles.fixedRatio}
                    type={type}
                    ratio={'16:9'}
                    flashMode={flash}
                >
                    <TouchableOpacity style={{top: '2%', marginLeft: 16}} onPress={()=>navigation.navigate('HomeScreen')}>
                        <Ionicons name='close' size={28} color={COLORS.white}/>
                    </TouchableOpacity>
                    <View style={styles.camFrame}></View>
                </Camera>
            </View>

            <View style={styles.bottomBar}>
                <Ionicons name='image' size={40} color={COLORS.white} onPress={pickImage}/>
                <TouchableOpacity style={styles.camCircle}>
                    <Ionicons name='camera' size={40} color={COLORS.white} onPress={takePicture}/>
                </TouchableOpacity>
                {flash===FlashMode.on?
                    <Ionicons name='flash' size={40} color={COLORS.white} onPress={changeFlashState}/>:
                    <Ionicons name='flash-off' size={40} color={COLORS.white} onPress={changeFlashState}/>
                }
            </View>
      {/* {imageUri && <Image source={{ uri: imageUri }} style={{ flex: 3 }} />} */}
        </View>
    );
}

export default Scanner

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cameraContainer: {
        flex: 5,
        flexDirection: 'row',
    },
    fixedRatio: {
        flex: 1,
    },
    bottomBar: {
        flex: 1,
        height: 120,
        width: '100%',
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    camCircle: {
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 60/2,
        borderWidth: 3,
        borderColor: COLORS.white,
        backgroundColor: COLORS.secondary
    },
    camFrame: {
        height: 300,
        width: 300,
        borderWidth: 1,
        alignSelf: 'center',
        top: '25%',
        borderColor: COLORS.white
    }
});