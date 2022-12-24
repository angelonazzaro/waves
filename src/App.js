// Import styles
import './styles/App.scss';
// Import components
import Nav from './components/Nav';
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
// Import songs data
import data from "./data"; 
import { useState, useRef } from 'react';

function App() {

  // state
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]); 
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

   // Using useRef to reference a specific HTML element
  const audioRef = useRef(null);

  return (
    <div>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} setCurrentSong={setCurrentSong}/>
      <Player currentSong={currentSong} audioRef={audioRef} setCurrentSong={setCurrentSong} 
        songs={songs} setSongs={setSongs} isSongPlaying={isSongPlaying} setIsSongPlaying={setIsSongPlaying}/>
        <Library libraryStatus={libraryStatus} songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong} 
          isSongPlaying={isSongPlaying} audioRef={audioRef} />
    </div>
  );
}

export default App;
