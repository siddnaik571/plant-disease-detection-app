import React from 'react'
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, TouchableOpacity, ToastAndroid, Alert, Image, ActivityIndicator, Pressable} from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar } from '../components'
import Ionicons from '@expo/vector-icons/Ionicons'
import { authentication, storage } from './firebase/firebase-config'
import * as ImagePicker from 'expo-image-picker';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const EditProfile = ({navigation}) => {

    //states for name and info
    const [name, setName]=useState(authentication.currentUser.displayName)
    const [email, setEmail]=useState(authentication.currentUser.email)
    const [phone, setPhone]=useState(authentication.currentUser.phoneNumber||'')

    //state for loader
    const [loading,setLoading]=useState(false)  

    //states to get camera and gallery permisssion
    const [galleryPermission, setGalleryPermission] = useState(null)
    const [cameraPermission, setCameraPermission] = useState(null);

    //state to set image uri
    const [imageUri, setImageUri] = useState(authentication.currentUser.photoURL);

    //function to get camera and gallery permission
    const permisionFunction = async () => {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        setCameraPermission(cameraPermission.status === 'granted');

        const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
        setGalleryPermission(imagePermission.status === 'granted');

        if (imagePermission.status !== 'granted' && cameraPermission.status !== 'granted')
        {
            alert('Permission for media access needed.');
        }
    }

    useEffect(() => {
        permisionFunction();
    }, []);

    // useEffect(()=>{
    //     if(image!=null)
    //     {
    //       uploadImage()
    //       setImage(null)
    //     }
    // },[image])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
          // navigation.push('DetectionScreen', {imageUri: result.assets[0].uri})
        }
    }

    const uploadImage=async()=>{

        const blobImage=await new Promise((resolve, reject)=>{
            const xhr=new XMLHttpRequest()
            xhr.onload=function(){
                resolve(xhr.response)
            }
            xhr.onerror=function(){
                reject(new TypeError("Network error failed"))
            }
            xhr.responseType="blob"
            xhr.open("GET", imageUri, true)
            xhr.send(null)
        })
        const metadata={
            contentType: 'image/jpeg'
        }

        const storageRef = ref(storage, `images/${authentication.currentUser.uid}`);
        const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            }, 
            (error) => {
                // Handle unsuccessful uploads
            }, 
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setImageUri(downloadURL)
                });
            }
        );
    }

    const editDetails=()=>{
        setLoading(true)
        uploadImage()
        updateProfile(authentication.currentUser, {
          displayName: name,
          email: email,
          phoneNumber: phone,
          photoURL: imageUri
        }).then(()=>{
          navigation.push('UserProfile')
        }).catch((error)=>{

        })
    }

    return (
        <SafeAreaView style={styles.container}>
          <FocussedStatusBar background={COLORS.primary}/>
          <View style={styles.header}>
              <Ionicons name='chevron-back' size={20} color={COLORS.graydark} onPress={()=>navigation.push('UserProfile')}/>
              <Text  style={{color: COLORS.graydark, fontFamily: FONTS.semiBold}}>Edit Profile</Text>
              {loading?
              <ActivityIndicator size="small" color={COLORS.secondary}/>:
              <Ionicons name='checkmark-sharp' size={20} color={COLORS.primary} onPress={editDetails}/>}
          </View>
          <View style={styles.secondaryContainer}>
              <View style={styles.userInfo}>
                  <Pressable style={styles.imageContainer} onPress={pickImage}>
                      <Image
                        style={styles.userImg}
                        source={{uri: imageUri}}
                      />
                      <View style={styles.iconcam}>
                        <Ionicons name='camera-outline' size={20} color={COLORS.graydark}/>
                      </View>
                  </Pressable>
              </View>
                  <Text style={styles.heading}>Your information</Text>
                  <View style={styles.inputContainer}>
                      <Ionicons name='person-outline' size={14} color={COLORS.grayneutral} style={{flex: 1}}/>
                      <TextInput placeholder='Name'
                       value={name} 
                       style={styles.textInput}
                       onChangeText={text=>setName(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name='mail-outline' size={14} color={COLORS.grayneutral} style={{flex: 1}}/>
              <TextInput placeholder='Email'
                       value={email} 
                       style={styles.textInput}
                       onChangeText={text=>setEmail(text)}
                       keyboardType='email-address'
              />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name='call-outline' size={14} color={COLORS.grayneutral} style={{flex: 1}}/>
              <TextInput placeholder='Phone'
                       value={phone} 
                       style={styles.textInput}
                       onChangeText={text=>setPhone(text)}
                       keyboardType='numeric'
              />
            </View>

        </View>
        
      </SafeAreaView>
    )
  }

const styles=StyleSheet.create({
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
        width: '100%',
        flex: 1,
        paddingHorizontal: 16
    },
    userInfo: {
        alignItems: 'center'
    },
    imageContainer: {
        marginVertical: 18,
        alignItems: 'center',
        height: 100,
        width: 100
    },
    userImg: {
        alignContent:'center',
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    iconcam: {
        position: 'absolute',
        bottom: 6,
        right: 2,
        height: 22,
        width: 22,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        fontSize: SIZES.large,
        fontFamily: FONTS.medium,
        marginVertical: 10,
        color: COLORS.secondary
    },
    inputContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: COLORS.graylight,
        borderRadius: 6,
        width: '100%',
        padding: 9,
        marginBottom: 20,
        alignItems: 'center'
    },
    textInput: {
        color: COLORS.graydark,
        flex: 8
    },
})
  
  export default EditProfile