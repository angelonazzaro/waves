import LibrarySong  from "./LibrarySong";

function Library({libraryStatus, songs, setSongs, setCurrentSong, isSongPlaying, audioRef}) {
    return(
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map((song) => <LibrarySong key={song.id} song={song} 
                    songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong} 
                    isSongPlaying={isSongPlaying} audioRef={audioRef} />)}
            </div>
        </div>
    );
}

export default Library;