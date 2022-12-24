import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faAngleLeft, faAngleRight, faVolumeLow, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';


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
        audioElement.currentTime = e.target.value;
        setCurrentSongInfo({...currentSongInfo, currentTime: e.target.value});
    }

    const skipSong = async (direction) => {
        let index = await songs.findIndex((song) => song.id === currentSong.id);
        
        if (direction === 'back') {

            // If the current song is playing or the track is not at the beginning, 
            // we make the song start over
            if (isSongPlaying || currentSongInfo.currentTime > 0) {
                audioElement.currentTime = 0;
                setCurrentSongInfo({...currentSongInfo, currentTime: 0, animationPercentage: 0});
                return; 
            }

            if ((index - 1) === -1)
                index = songs.length - 1;
            else
                index--; 
        } else {
            index = (index + 1) % songs.length;
        }

        await setCurrentSong(songs[index]);

        if (isSongPlaying) audioRef.current.play();
        
        const newSongs = songs.map((song) => {return {...song, active: song.id === songs[index].id}});
        await setSongs(newSongs);
    }

    const volumeDragHandler = (e) => {
        audioElement.volume = parseFloat(e.target.value); 

        if (audioElement.volume === 0)
            setIsSongMuted(true);
        else
            setIsSongMuted(false);

        setCurrentSongInfo({...currentSongInfo, volume: audioElement.volume})
    }

    // Format current song's current time and duration
    const formatTime = (time) => {
        return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2); 
    }

    // State
    const [currentSongInfo, setCurrentSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,
        volume: 1
    });

    const [isSongMuted, setIsSongMuted] = useState(!currentSongInfo.volume > 0); 

    // Animations
    const trackAnim = {
        transform: `translateX(${currentSongInfo.animationPercentage}%)`
    };

    const volumeAnim = {
        transform: `translateX(${currentSongInfo.volume * 100}%)`
    }

	return (
		<div className="player">
            <div className="time-control">
                <p>{formatTime(currentSongInfo.currentTime)}</p>
                <div className="track song-track" style={{background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`}}>
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
            <div className="volume-control">
                <FontAwesomeIcon icon={isSongMuted ? faVolumeXmark : faVolumeLow} size="2x" />
                 <div className="track volume-track" style={{background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`}}>
                    <input type="range" min={0} max={1} step={0.01} 
                        value={currentSongInfo.volume || 1} onChange={volumeDragHandler} />
                    <div style={volumeAnim} className="animate-track"></div>
                </div>
            </div>
            <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} 
                onEnded={() => skipSong('forward')} ref={audioRef} src={currentSong.audio}></audio>
		</div>
	);
}

export default Player;
