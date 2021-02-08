import React, { useState, useEffect } from 'react';
import { Avatar } from '@material-ui/core';
import './Chats.css';
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import {db, auth} from './firebase';
import Chat from './Chat';
import { selectUser } from './features/appSlice';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { resetCameraImage } from './features/cameraSlice';
const Chats=()=>{
    const [posts, setPosts]= useState([]);
    const user= useSelector(selectUser);
    const dispatch = useDispatch();
    const history= useHistory();
    useEffect(()=>{
        db.collection("posts").orderBy('timestamp', 'desc').onSnapshot(snapshot=>{
            setPosts(snapshot.docs.map((doc)=>({
                id: doc.id,
                data: doc.data(),
            })))
        })
    }, [])
    const takeSnap=()=>{
        dispatch(resetCameraImage());
        history.push('/');
    };
    return (
       <div className= "chats">
            <div className= "chats__header">
                <Avatar src= {user.profilePic} onClick= {()=> auth.signOut()} className= "chats__avatar" />
                <div className= "chats__search">
                    <SearchIcon className= "chats__searchIcon" />
                    <input type= "text" placeholder= "Friends"/>
                </div>
                <ChatBubbleIcon className= "chats__chatIcon" />
            </div>
            <div className= "chats__posts">
                {posts.map(({id, data: {profilePic, username, timestamp, imageUrl, read}})=>(
                    <Chat id= {id}
                    profilePic= {profilePic}
                    username= {username}
                    timestamp= {timestamp}
                    imageUrl= {imageUrl}
                    read= {read} />
                ))}
            </div>
            <RadioButtonUncheckedIcon
                className= "chats__takePicIcon"
                onClick= {takeSnap}
                font-size= 'large'
             />
       </div>
    );
};
export default Chats;