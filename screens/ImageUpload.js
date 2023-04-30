import React,{useState, useEffect} from 'react'
import { View, 
        Text, 
        TouchableHighlight,
        TouchableOpacity, 
        StyleSheet, 
        ToastAndroid,
        Image,
        SafeAreaView} from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar } from '../components'
import * as ImagePicker  from 'expo-image-picker'
import {Permissions} from 'expo'

const ImageUpload = ({navigation}) => {
    const [Pic, setPic] = useState(null);
    const [galleryPermission, setGalleryPermission] = useState(null);
    const [imageAssets, setImageAssets] = useState(null);

    //For permissions
    const permissionFunction = async () => {
        const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
        console.log(imagePermission.status);
    
        setGalleryPermission(imagePermission.status === 'granted');
        if (imagePermission.status !== 'granted') 
        {
          alert('Permission for media access needed.');
        }
      };

      useEffect(() => {
        permissionFunction();
      }, []);

        //for show toast message
        const setToastMsg = msg => {
        ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
        };

        const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
    
        console.log(result);
        if (!result.canceled) {
          setImageAssets(result.assets);
        }
    };

    const removeImage = () => {
        setPic('')
        setToastMsg('Image removed');
    }

    const UploadImage = () => {
        setPic(true)
        setToastMsg('Image uploaded');
    }

    return (
        <SafeAreaView style={styles.container}>
            <FocussedStatusBar background={COLORS.primary}/>
                <View style={styles.secondaryContainer}>
                    <View style= {[styles.centerContent, {marginTop:50,flexDirection:'row'}]}>
                    <TouchableOpacity 
                    style={styles.buttonContainer} 
                    onPress={() => pickImage()}>
                    <Text>Upload Image</Text>
                    {imageAssets && <Image source={{ uri: imageAssets }} style={{ flex: 1 }} />}
                    </TouchableOpacity>
                
                    <TouchableOpacity 
                    style={styles.buttonContainer} 
                    onPress={() => removeImage()}>
                        <Text>Remove Image</Text>
                    </TouchableOpacity>
                    </View>
                </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    centerContent: {
        justifyContent: 'center',
        alighItems: 'center',
        marginTop: 100,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 60
    },
    secondaryContainer: {
        width: '100%',
    },
    circle:{
        width:100,
        height:100,
        borderRadius:100/2 ,
        backgroundColor: '#adff2f'
    },
    buttonContainer: {
        backgroundColor: '#248232',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 9,
        borderRadius: 4
    }, 
    button: {
        color: '#FFF'
    },

})
export default ImageUpload