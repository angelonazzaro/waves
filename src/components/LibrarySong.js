
function LibrarySong({song, songs, setSongs, setCurrentSong, isSongPlaying, audioRef}) {

    const songSelectHandler = async () => {
        await setCurrentSong(song); 

        const updatedSongs = songs.map((oldSong) => {
           return {...oldSong, active: oldSong.id === song.id}; 
        });

        setSongs(updatedSongs);

        if (!isSongPlaying) return; 

        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                audioRef.current.play();
            }).catch((err) => console.error(err));
        }
    }

    return (
        <div className={`library-song ${song.active ? 'selected' : ''}`} onClick={songSelectHandler}>
           <img src={song.cover} alt={song.name} />
           <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
           </div>
       </div>
       );
}

export default LibrarySong;