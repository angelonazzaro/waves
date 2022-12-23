import { useRef, useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faPause, faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';


function Player({currentSong, setCurrentSong, isSongPlaying, setIsSongPlaying}) {
    // Using useRef to reference a specific HTML element
    const audioRef = useRef(null);

    // Event handlers
    const playSongHandler = () => {
        // Get DOM element
        const audioElement = audioRef.current; 
        
        if (isSongPlaying)
            audioElement.pause();
        else
            audioElement.play();
        
        setIsSongPlaying(!isSongPlaying);
    }

    const timeUpdateHandler = (e) => {
        const currentTime = e.target.currentTime;
        const duration = e.target.duration; 

        setCurrentSongInfo({...currentSongInfo, currentTime, duration});
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setCurrentSongInfo({...currentSongInfo, currentTime: e.target.value});
    }

    // Format current song's current time and duration
    const formatTime = (time) => {
        return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2); 
    }

    // State
    const [currentSongInfo, setCurrentSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    });

	return (
		<div className="player">
            <div className="time-control">
                <p>{formatTime(currentSongInfo.currentTime)}</p>
                <input type="range" min={0} max={currentSongInfo.duration} 
                    value={currentSongInfo.currentTime} onChange={dragHandler}/>
                <p>{formatTime(currentSongInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
			    <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" 
                    icon={isSongPlaying ? faPause : faPlay} />
			    <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} />
            </div>
            <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} 
                ref={audioRef} src={currentSong.audio}></audio>
		</div>
	);
}

export default Player;
