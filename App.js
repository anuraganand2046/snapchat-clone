import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import WebcamCapture from './WebcamCapture';
import './App.css';
import Chats from './Chats';
import ChatView from './ChatView';
import Preview from './Preview';
import {useSelector, useDispatch} from 'react-redux';
import Login from './Login';
import { selectUser, login, logout} from './features/appSlice';
import { auth } from './firebase';
function App() {
  const user= useSelector(selectUser);
  const dispatch= useDispatch();
  useEffect(()=>{
    auth.onAuthStateChanged(authUser=>{
      if(authUser){
        dispatch(login({
                username:authUser.displayName,
                profilePic: authUser.photoURL,
                id: authUser.uid
            }))
      }
      else{
        dispatch(logout());
      }
    })
  }, [])
  return (
    <div className="app">
    <Router>
      {!user ? (
        <Login></Login>
      ):(
        <>
        <img className= "app__logo" src= "https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg" />
        <div className= "app__body">
        <div className= "app__bodyBackground">
        <Switch>
            <Route path="/chats/view">
              <ChatView />
            </Route>
            <Route path="/chats">
              <Chats />
            </Route>
            <Route path="/preview">
              <Preview />
            </Route>
            <Route exact path="/">
              <WebcamCapture />
            </Route>
          </Switch>
        </div>
      </div>
      </>)}
     </Router>
    </div>
  );
}
export default App;
