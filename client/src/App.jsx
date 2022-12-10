import './App.css';
import { useState } from "react";
import Navbar from './components/NavBar';
import Main from './components/Main';
import Choice from './components/Choice';
import ChatBox from './components/ChatBox';
import Game from './components/Game';
import UserPage from './components/UserPage'

function App() {

  const [location, setLocation] = useState('main');

  return (
    <div className="App">
      <Navbar handleSetLocation={setLocation}/>
      {/*<ChatBox/>*/}
      {location === 'main' && <Main handleSetLocation={setLocation} />}
      {location === 'choose' && <Choice handleSetLocation={setLocation} />}
      {location === 'game' && <Game />}
    </div>
  );
}

export default App;