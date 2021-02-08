import React, {useRef, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Webcam from 'react-webcam';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import './WebcamCapture.css';
import { setCameraImage } from './features/cameraSlice';
const videoConstraints={
    width: 250,
    height: 400,
    facingMode: "user"
};
const WebcamCapture=()=>{
    const webcamRef= useRef(null);
    const dispatch= useDispatch();
    const history= useHistory();
    const capture= useCallback(()=>{
        const imageSrc= webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSrc));
        history.push('./Preview');
    }, [webcamRef]);
    return (
        <div className= "webcamCapture">
            <Webcam
            audio= {false}
            height= {videoConstraints.height}
            ref= {webcamRef}
            screenshotFormat= "image/jpeg"
            width= {videoConstraints.width}
            videoConstraints= {videoConstraints}
            ></Webcam>
            <RadioButtonUncheckedIcon className= "webcamCapture__button" onClick= {capture} fontSize= "large">
            </RadioButtonUncheckedIcon>
        </div>
    );
};
export default WebcamCapture;