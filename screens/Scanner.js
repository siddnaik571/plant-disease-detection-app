import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera, FlashMode } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Permissions } from 'expo';
import Ionicons from '@expo/vector-icons/Ionicons'
import { COLORS, FONTS, SIZES } from '../constants'

const Scanner=({ navigation })=> {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);

  const [camera, setCamera] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash,setFlash]=useState(FlashMode.off)

  const permisionFunction = async () => {
    // here is how you can get the camera permission
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

    setCameraPermission(cameraPermission.status === 'granted');

    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    console.log(imagePermission.status);

    setGalleryPermission(imagePermission.status === 'granted');

    if (
      imagePermission.status !== 'granted' &&
      cameraPermission.status !== 'granted'
    ) {
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
      
      console.log(data.uri);
      setImageUri(data.uri);

      //1
      navigation.push('DetectionScreen', {imageUri: data.uri})
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
      navigation.push('DetectionScreen', {imageUri: result.assets[0].uri})
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
        />
      </View>

      <View style={styles.bottomBar}>
        <Ionicons name='image' size={40} color='#FFF' onPress={pickImage}/>
        <View style={styles.camCircle}>
          <Ionicons name='camera' size={40} color='#FFF' onPress={takePicture}/>
        </View>
        {flash===FlashMode.on?
          <Ionicons name='flash' size={40} color='#FFF' onPress={changeFlashState}/>:
          <Ionicons name='flash-off' size={40} color='#FFF' onPress={changeFlashState}/>
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
    borderColor: 'white',
    backgroundColor: 'green'
  }
});