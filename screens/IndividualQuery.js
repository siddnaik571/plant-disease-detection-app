import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { FocussedStatusBar, QueryBox, Comment } from '../components'
import Ionicons from '@expo/vector-icons/Ionicons'
import { COLORS, FONTS, SIZES } from '../constants'
import { Entypo, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import { collection, getDocs, doc, setDoc, Firestore, Timestamp, increment, updateDoc, arrayUnion, FieldValue, arrayRemove, getDoc } from 'firebase/firestore/lite'
import { authentication } from './firebase/firebase-config'
import { db } from './firebase/firebase-config'

const IndividualQuery = ({navigation,route}) => {

    //state to store comment of current user
    const [comment,setComment]=React.useState('')

    //function to update upvotes 
    const updateUpVote=async(id,upvoteNo,upVote,arr)=>{

        const index = arr.findIndex((obj)=>{
            if(obj!==null){
                return obj.id===id
            }
        });

        const queryRef = doc(db, "queries", String(route.params.obj.id));
        const matches=await getDoc(queryRef)
        const docData = matches.data()
        docData.commentList[index].upvote=upvoteNo

        if(upVote){
            const ind = docData.commentList[index].upvotelist.findIndex((obj)=>obj===(authentication.currentUser.uid))
            docData.commentList[index].upvotelist.splice(ind,1)
        }else{
            console.log("Egg")
            docData.commentList[index].upvotelist.push(authentication.currentUser.uid)
        }

        return updateDoc(queryRef, {
            ...docData
        });
    }

    //function to update downvotes
    const updateDownVote=async(id,downvoteNo,downVote,arr)=>{

        const index = arr.findIndex((obj)=>{
            if(obj!==null){
                return obj.id===id
            }
        });

        const queryRef = doc(db, "queries", String(route.params.obj.id));
        const matches=await getDoc(queryRef)
        const docData = matches.data()
        docData.commentList[index].downvote=downvoteNo

        if(downVote){
            const ind = docData.commentList[index].downvotelist.findIndex((obj)=>obj===(authentication.currentUser.uid))
            docData.commentList[index].downvotelist.splice(ind,1)
        }else{
            docData.commentList[index].downvotelist.push(authentication.currentUser.uid)
        }

        return updateDoc(queryRef, {
            ...docData
        });
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
                        name: authentication.currentUser.displayName,
                        pimg: authentication.currentUser.photoURL
                    },
                }
            )
        });

        setComment('')

        navigation.push('CommunityTimeline')
    }

    const commentJSX=route.params.obj.commentList.map((com,index)=>{
        if(com!=null){
            return (
                <Comment key={index} arr={route.params.obj.commentList} obj={com} updateUpVote={updateUpVote} updateDownVote={updateDownVote}/>
            )
        }
    })

  return (
    <SafeAreaView style={styles.container}>
        <FocussedStatusBar background={COLORS.primary}/>
        <View style={styles.secondaryContainer}>
            <View style={styles.header}>
                <AntDesign name='arrowleft' size={20} color="#708090" onPress={()=>navigation.navigate('CommunityTimeline')}/>
            </View>
            <View style={{flex: 5}}>
                {commentJSX}
            </View>
            <View style={styles.commentBox}>
                <TextInput placeholder='Add a comment'
                           value={comment}
                           onChangeText={text=>setComment(text)}
                           multiline={true}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={UpdateData}>
                    <Text style={styles.button}>Post</Text>
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
    back: {
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
    button: {
      color: COLORS.white
    },
    commentBox: {
        height: 50,
        padding: 10,
        borderWidth: 1,
        borderColor: COLORS.graylight,
        borderRadius: 5,
        marginHorizontal: 16,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default IndividualQuery