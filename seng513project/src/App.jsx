import './App.css';
import { useState } from "react";
import Navbar from './components/NavBar';
import Main from './components/Main';
import Choice from './components/Choice';
import ChatBox from './components/ChatBox';

function App() {

  const [location, setLocation] = useState('main');

  console.log(location);

  return (
    <div className="App">
      <Navbar handleSetLocation={setLocation}/>
      {location == 'main' && <Main handleSetLocation={setLocation} />}
      {location == 'choose' && <Choice />}
      <h1>Hello World!</h1>
      <ChatBox/>
    </div>
  );
}

export default App;