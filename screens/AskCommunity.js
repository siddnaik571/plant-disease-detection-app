import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { FocussedStatusBar } from '../components'
import Ionicons from '@expo/vector-icons/Ionicons'
import { COLORS, FONTS, SIZES } from '../constants'
import { collection, getDocs, doc, setDoc, Firestore, Timestamp, increment } from 'firebase/firestore/lite'
import { authentication } from './firebase/firebase-config'
import { db } from './firebase/firebase-config'

const AskCommunity = ({navigation}) => {

    //states to store title and description
    const [title,setTitle]=React.useState('')
    const [description,setDescription]=React.useState('')

    //function to store the query in firestore database
    const SetData=async()=>{
        // const quesCol=collection(db,'queries')
        // const quesSnapshot=await getDocs(quesCol)
        // const quesList=quesSnapshot.docs.map(doc=>doc.data())
        // console.log(quesList)
        //queslist is a list of objects

        const id=Math.random()*20000
        await setDoc(doc(db, "queries", String(id)), {
            id: id,
            title: title,
            description: description,
            upvote: 0,
            downvote: 0,
            upvotelist: [null],
            downvotelist: [null],
            comments: 0,
            commentList: [null],
            postTime: Timestamp.fromDate(new Date()),
            user: {
                id: authentication.currentUser.uid,
                name: authentication.currentUser.displayName,
                pimg: authentication.currentUser.photoURL
            },
        });

        navigation.push('CommunityTimeline')
          
     }


  return (
    <SafeAreaView style={styles.container}>
        <FocussedStatusBar background={COLORS.primary}/>
        <View style={styles.secondaryContainer}>
            <View style={styles.header}>
                <Ionicons name='close-outline' style={styles.close} 
                onPress={()=>navigation.navigate('CommunityTimeline')}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={SetData}>
                    <Text style={styles.buttonText}>Post</Text>
                </TouchableOpacity>
            </View>
            <View>
                <View style={styles.title}>
                    <TextInput placeholder='Give a suitable title'
                               style={styles.titleText}
                               value={title}
                               onChangeText={text=>setTitle(text)}
                               multiline={true}
                    />
                </View>
                <View style={styles.description}>
                    <TextInput placeholder='Description of your problem'
                               value={description}
                               onChangeText={text=>setDescription(text)}
                               multiline={true}
                    />
                </View>
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
        paddingHorizontal: 16,
    },
    secondaryContainer: {
        flex: 1,
        width: '100%',
        marginVertical: 15
    },
    header: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    close: {
        fontSize: 30
    },
    buttonContainer: {
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        width: 60,
        height: 30
    }, 
    buttonText: {
        color: COLORS.white
    },
    title: {
        minHeight: 50,
        marginVertical: 20,
        borderColor: COLORS.graylight,
        borderBottomWidth: 1,
        paddingBottom: 10,
    },
    titleText: {
        fontSize: SIZES.large,
        fontFamily: FONTS.medium,
    },
    description: {
        minHeight: 100
    }
})

export default AskCommunity