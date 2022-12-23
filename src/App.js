// Import styles
import './styles/App.scss';
// Import components
import Player from './components/Player';
import Song from './components/Song';
// Import songs data
import data from "./data"; 
import { useState } from 'react';

function App() {

  // state
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]); 

  return (
    <div>
      <Song currentSong={currentSong} setCurrentSong={setCurrentSong}/>
      <Player />
    </div>
  );
}

export default App;
