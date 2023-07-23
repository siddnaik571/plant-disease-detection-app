import React from 'react'
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { Entypo, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { authentication } from '../screens/firebase/firebase-config'

const QueryBox=(props)=>{

    //function to check if the query is upvoted by the current logged in user
    const checkUpvote=()=>{
        if(props.obj.upvotelist.includes(authentication.currentUser.uid)){
            return true
        }else{
            return false
        }
    }

    //function to check if the query is downvoted by the current logged in user
    const checkDownvote=()=>{
        if(props.obj.downvotelist.includes(authentication.currentUser.uid)){
            return true
        }else{
            return false
        }
    }

    const [upVote, setUpVote]=useState(checkUpvote())
    const [downVote, setDownVote]=useState(checkDownvote())

    const [upvoteNo,setUpvoteNo]=useState(props.obj.upvote)
    const [downvoteNo,setDownvoteNo]=useState(props.obj.downvote)

    //function to change no of upvotes
    const changeUpVoteState=(id)=>{
        if(upVote){
            setUpvoteNo(prev=>prev-1)
            props.updateUpVote(id,upvoteNo-1,upVote)
        }else{
            setUpvoteNo(prev=>prev+1)
            props.updateUpVote(id,upvoteNo+1,upVote)
            if(downVote){
                setDownvoteNo(prev=>prev-1)
                setDownVote(prev=>!prev)
                props.updateDownVote(id,downvoteNo-1,downVote)
            } 
        }
        setUpVote(prev=>!prev)              
    }

    //function to change no of  downvotes
    const changeDownVoteState=(id)=>{
        if(downVote){
            setDownvoteNo(prev=>prev-1)
            props.updateDownVote(id,downvoteNo-1,downVote)
        }else{
            setDownvoteNo(prev=>prev+1)
            props.updateDownVote(id,downvoteNo+1,downVote)
            if(upVote){
                setUpvoteNo(prev=>prev-1)
                setUpVote(prev=>!prev)
                props.updateUpVote(id,upvoteNo-1,upVote)
            } 
        }
        setDownVote(prev=>!prev)              
    }

    return (
        <View style={styles.queryBox}>
            <View style={styles.queryBoxHeader}>
                <View><Image style={styles.avatar} source={{uri: props.obj.user.pimg}}/></View>
                <View>
                    <Text style={styles.profileName}>{props.obj.user.name}</Text>
                    <Text style={styles.profileDate}>{(props.obj.postTime).toDate().toDateString().substr(4)}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.queryBoxBody} 
                              onPress={()=>props.navigation.navigate('IndividualQuery', 
                                                                    {obj: props.obj})}
            >
                <View>
                    <Text style={{fontSize: SIZES.medium, fontFamily: FONTS.medium, color: '#708090'}}>
                        {props.obj.title}
                    </Text>
                </View>
                {props.obj.description && 
                    <View style={{paddingTop: 3}}>
                        <Text style={{color: '#708090'}}>{props.obj.description}</Text>
                    </View>
                }
            </TouchableOpacity>
            <View style={styles.votes}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialCommunityIcons 
                        name={upVote? 'arrow-up-bold':'arrow-up-bold-outline'} 
                        size={22} 
                        color={upVote? COLORS.primary:COLORS.graydark}
                        onPress={()=>changeUpVoteState(props.obj.id)}
                    />
                    <Text style={styles.iconData}>{upvoteNo}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {/* <Ionicons name='arrow-down' size={18}/> */}
                    <MaterialCommunityIcons 
                        name={downVote? 'arrow-down-bold':'arrow-down-bold-outline'} 
                        size={22} 
                        color={downVote? COLORS.primary:COLORS.graydark}
                        onPress={()=>changeDownVoteState(props.obj.id)}
                    />
                    <Text style={styles.iconData}>{downvoteNo}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialCommunityIcons 
                        name='comment-outline' 
                        size={20} 
                        color={COLORS.graydark}
                    />
                    <Text style={styles.iconData}>{props.obj.commentList.length-1}</Text>
                </View>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    queryBox: {
        // borderColor: COLORS.graylight,
        // borderWidth: 1,
        minHeight: 125,
        width: '100%',
        marginBottom: 26,
        borderRadius: 5,
        backgroundColor: COLORS.white
    },
    queryBoxHeader: {
        borderBottomColor: COLORS.graylight,
        borderBottomWidth: 1,
        paddingHorizontal: 13,
        paddingVertical: 6,
        flexDirection: 'row'
    },
    avatar: {
        borderRadius: 30,
        height: 26,
        width: 26,
        marginRight: 7
    },
    profileName: {
        color: COLORS.primary,
        fontSize: 12,
        fontFamily: FONTS.medium
    },
    profileDate: {
        fontSize: 11,
        color: COLORS.graydark
    },
    queryBoxBody: {
        borderBottomColor: COLORS.graylight,
        borderBottomWidth: 1,
        paddingHorizontal: 13,
        paddingVertical: 10,
    },
    votes: {
        height: 35,
        flexDirection: 'row',
        paddingHorizontal: 13,
        gap: 13
    },
    iconData: {
        marginLeft: 1,
        color: COLORS.graydark
    }
})

export default QueryBox