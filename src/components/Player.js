import { useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faPause, faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';


function Player({currentSong, audioRef, setCurrentSong, songs, setSongs, isSongPlaying, setIsSongPlaying}) {    
    // Get DOM element
    const audioElement = audioRef.current;

    // Event handlers
    const playSongHandler = () => {    
        if (isSongPlaying)
            audioElement.pause();
        else
            audioElement.play();
        
        setIsSongPlaying(!isSongPlaying);
    }

    const timeUpdateHandler = (e) => {
        const currentTime = e.target.currentTime;
        const duration = e.target.duration; 

        const animationPercentage = Math.round((Math.round(currentTime) * 100) / Math.round(duration)); 

        setCurrentSongInfo({...currentSongInfo, currentTime, duration, animationPercentage});
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setCurrentSongInfo({...currentSongInfo, currentTime: e.target.value});
    }

    const skipSong = async (direction) => {
        let currentIndex = await songs.findIndex((song) => song.id === currentSong.id);
        
        if (direction === 'back') {
            if ((currentIndex - 1) === -1)
                currentIndex = songs.length - 1;
            else
                currentIndex--; 
        } else {
            currentIndex = (currentIndex + 1) % songs.length;
        }

        await setCurrentSong(songs[currentIndex]);

        if (isSongPlaying) audioRef.current.play();
        
        const newSongs = songs.map((song) => {return {...song, active: song.id === currentSong.id}});
        await setSongs(newSongs);
    }

    // Format current song's current time and duration
    const formatTime = (time) => {
        return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2); 
    }

    // State
    const [currentSongInfo, setCurrentSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0
    });

    // Animations
    const trackAnim = {
        transform: `translateX(${currentSongInfo.animationPercentage}%)`,
    };

	return (
		<div className="player">
            <div className="time-control">
                <p>{formatTime(currentSongInfo.currentTime)}</p>
                <div className="track" style={{background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`}}>
                    <input type="range" min={0} max={currentSongInfo.duration || 0} 
                        value={currentSongInfo.currentTime} onChange={dragHandler} />
                    <div style={trackAnim} className="animate-track"></div>
                </div>
                <p>{formatTime(currentSongInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipSong('back')} className="skip-back" 
                    size="2x" icon={faAngleLeft} />
			    <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" 
                    icon={isSongPlaying ? faPause : faPlay} />
			    <FontAwesomeIcon onClick={() => skipSong('forward')} className="skip-forward" 
                    size="2x" icon={faAngleRight} />
            </div>
            <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} 
                onEnded={() => skipSong('forward')} ref={audioRef} src={currentSong.audio}></audio>
		</div>
	);
}

export default Player;
