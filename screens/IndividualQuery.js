import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { FocussedStatusBar, QueryBox, Comment } from '../components'
import Ionicons from '@expo/vector-icons/Ionicons'
import { COLORS, FONTS, SIZES } from '../constants'
import { Entypo, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import { collection, getDocs, doc, setDoc, Firestore, Timestamp, increment, updateDoc, arrayUnion } from 'firebase/firestore/lite'
import { authentication } from './firebase/firebase-config'
import { db } from './firebase/firebase-config'

const IndividualQuery = ({navigation,route}) => {

    //state to store comment of current user
    const [comment,setComment]=React.useState('')

    //function to update upvotes 
    const updateUpVote=async(id,upvoteNo,upVote)=>{
        if(upVote){
            await updateDoc(doc(db,"queries",String(id)),{
                "commentList":{
                    "upvote": upvoteNo,
                    "upvotelist": arrayRemove(authentication.currentUser.uid)
                }
            })
        }else{
            await updateDoc(doc(db,"queries",String(id)),{
                "commentList":{
                    "upvote": upvoteNo,
                    "upvotelist": arrayUnion(authentication.currentUser.uid)
                }
            })
        }
    }

    //function to update downvotes
    const updateDownVote=async(id,downvoteNo,downVote)=>{
        if(downVote){
            await updateDoc(doc(db,"queries",String(id)),{
                "commentList": {
                    "downvote": downvoteNo,
                    "downvotelist": arrayRemove(authentication.currentUser.uid)
                }
            })
        }else{
            await updateDoc(doc(db,"queries",String(id)),{
                "commentList": {
                    "downvote": downvoteNo,
                    "downvotelist": arrayUnion(authentication.currentUser.uid)
                }
            })
        }
    }

    const UpdateData=async()=>{

        const id=Math.random()*200000
        await updateDoc(doc(db, "queries", String(route.params.obj.id)), {
            "commentList": arrayUnion(
                {
                    id: id,
                    comment: comment,
                    upvote: 0,
                    downvote: 0,
                    upvotelist: [null],
                    downvotelist: [null],
                    postTime: Timestamp.fromDate(new Date()),
                    user: {
                        id: authentication.currentUser.uid,
                        name: authentication.currentUser.displayName
                    },
                }
            )
        });
        navigation.push('CommunityTimeline')
    }

    const commentJSX=route.params.obj.commentList.map((com)=>{
        if(com!=null){
            return (
                <Comment obj={com} updateUpVote={updateUpVote} updateDownVote={updateDownVote}/>
            )
        }
    })

  return (
    <SafeAreaView style={styles.container}>
        <FocussedStatusBar background={COLORS.primary}/>
        <View style={styles.secondaryContainer}>
            <View style={styles.header}>
                <AntDesign name='arrowleft' size={20} color="#708090"/>
            </View>
            <View style={{flex: 5}}>
                {console.log(commentJSX.length)}
                {commentJSX}
            </View>
            <View style={styles.commentBox}>
                <TextInput placeholder='Add a comment'
                           value={comment}
                           onChangeText={text=>setComment(text)}
                           multiline={true}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={UpdateData}>
                    <Text>Post</Text>
                </TouchableOpacity>
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
    secondaryContainer: {
        flex: 1,
        width: '100%',
        // marginVertical: 15
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
        borderColor: '#EBEFEC',
      },
    back: {
        fontSize: 30
    },
    buttonContainer: {
        backgroundColor: '#248232',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        width: 60,
        height: 30
    }, 
    button: {
      color: '#FFF'
    },
    commentBox: {
        height: 50,
        padding: 10,
        borderWidth: 1,
        marginHorizontal: 16,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default IndividualQuery