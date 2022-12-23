import { useRef } from 'react';
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

	return (
		<div className="player">
            <div className="time-control">
                <p>Start Time</p>
                <input type="range" />
                <p>End Time</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
			    <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" 
                    icon={isSongPlaying ? faPause : faPlay} />
			    <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} />
            </div>
            <audio ref={audioRef} src={currentSong.audio}></audio>
		</div>
	);
}

export default Player;
