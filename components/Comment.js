import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../constants'
import { Entypo, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { authentication } from '../screens/firebase/firebase-config'

const Comment = (props,{navigation}) => {

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

    const [upVote, setUpVote]=React.useState(checkUpvote())
    const [downVote, setDownVote]=React.useState(checkDownvote())

    const [upvoteNo,setUpvoteNo]=React.useState(props.obj.upvote)
    const [downvoteNo,setDownvoteNo]=React.useState(props.obj.downvote)

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

    //
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
            <View><Image style={styles.avatar} source={require('../assets/images/profile_picture.png')}/></View>
            <View style={{flexDirection: 'row', gap: 4}}>
              <Text style={styles.profileName}>{props.obj.user.name}</Text>
              <Entypo name="dot-single" size={15} color="#708090"/>
              <Text style={styles.profileDate}>1 day</Text>
            </View>
        </View>
        <View style={styles.queryBoxBody}>
          <Text style={{color: '#708090'}}>{props.obj.comment}</Text>
        </View>
        <View style={styles.votes}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons 
                name={upVote? 'arrow-up-bold':'arrow-up-bold-outline'} 
                size={18} 
                color={upVote? '#248232':'#708090'}
                onPress={changeUpVoteState}
            />
            <Text style={styles.iconData}>{props.obj.upvote}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons 
                name={downVote? 'arrow-down-bold':'arrow-down-bold-outline'} 
                size={18} 
                color={downVote? '#248232':'#708090'}
                onPress={changeDownVoteState}
            />
            <Text style={styles.iconData}>{props.obj.downvote}</Text>
          </View>
        </View>
      </View>
    )
}

export default Comment

const styles = StyleSheet.create({
    queryBox: {
        borderColor: '#D9D9D9',
        borderWidth: 1,
        width: '100%',
        marginBottom: 12,
    },
    queryBoxHeader: {
        borderBottomColor: '#D9D9D9',
        borderBottomWidth: 1,
        paddingHorizontal: 13,
        paddingVertical: 6,
        flexDirection: 'row',
        alignItems: 'center'
    },
    queryBoxBody: {

        borderBottomColor: '#D9D9D9',
        borderBottomWidth: 1,
        paddingHorizontal: 13,
        paddingVertical: 10,
    },
    profileName: {
        color: '#248232',
        fontSize: 12
    },
    profileDate: {
        fontSize: 11
    },
    avatar: {
        borderRadius: 30,
        height: 23,
        width: 23,
        marginRight: 7
    },
    votes: {
        height: 30,
        flexDirection: 'row',
        paddingHorizontal: 13,
        justifyContent: 'flex-end',
        gap: 13
    },
    iconData: {
      marginLeft: 1,
      color: '#708090'
  }
})