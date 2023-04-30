import React from 'react'
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, FlatList, TouchableOpacity, Image, ScrollView, Pressable } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { FocussedStatusBar, QueryBox, TabBar } from '../components'
import Ionicons from '@expo/vector-icons/Ionicons'
import { collection, getDocs, doc, setDoc, increment, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore/lite'
import { authentication } from './firebase/firebase-config'
import { db } from './firebase/firebase-config'

const CommunityTimeline=({navigation,route})=>{

    //state to hold list of queries from firestore
    const [queries, setQueries]=useState([])

    //function to get data from firestore database
    const GetData=async()=>{
        const quesCol=collection(db,'queries')
        const quesSnapshot=await getDocs(quesCol)
        const quesList=quesSnapshot.docs.map(doc=>doc.data())
        setQueries(quesList)
    }

    useEffect(()=>{
        GetData()
    },[])

    //function to update upvotes 
    const updateUpVote=async(id,upvoteNo,upVote)=>{
        if(upVote){
            await updateDoc(doc(db,"queries",String(id)),{
                "upvote": upvoteNo,
                "upvotelist": arrayRemove(authentication.currentUser.uid)
            })
        }else{
            await updateDoc(doc(db,"queries",String(id)),{
                "upvote": upvoteNo,
                "upvotelist": arrayUnion(authentication.currentUser.uid)
            })
        }
    }

    //function to update downvotes
    const updateDownVote=async(id,downvoteNo,downVote)=>{
        if(downVote){
            await updateDoc(doc(db,"queries",String(id)),{
                "downvote": downvoteNo,
                "downvotelist": arrayRemove(authentication.currentUser.uid)
            })
        }else{
            await updateDoc(doc(db,"queries",String(id)),{
                "downvote": downvoteNo,
                "downvotelist": arrayUnion(authentication.currentUser.uid)
            })
        }
    }

    //map over list of queries to create list of JSX elements of queries 
    const queryJSX=queries.map((query)=><QueryBox key={Math.random()*20000} obj={query} updateUpVote={updateUpVote} updateDownVote={updateDownVote} navigation={navigation}/>)
    
    return (
        <SafeAreaView style={styles.container}>
            <FocussedStatusBar background={COLORS.primary}/>
            <ScrollView style={styles.secondaryContainer} showsVerticalScrollIndicator={false}>
                <Text style={styles.mainText}>Ask Community</Text>
                <View>
                    {queryJSX}
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.buttonContainer} onPress={()=>navigation.push('AskCommunity')}>
                <Ionicons name="pencil" color="#fff"/>
                <Text style={styles.button}>Ask Community</Text>
            </TouchableOpacity>
            <TabBar navigation={navigation}/>
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
        paddingHorizontal: 16,
    },
    mainText: {
        fontSize: SIZES.extraLarge,
        color: '#2BA84A',
        marginTop: 45,
        marginBottom: 35,
        fontFamily: FONTS.semiBold
    },
    buttonContainer: {
        backgroundColor: '#248232',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
        borderRadius: 20,
        width: 155,
        height: 43,
        position: 'absolute',
        bottom: 70,
        right: 16
    }, 
    button: {
      color: '#FFF'
    },
})

export default CommunityTimeline