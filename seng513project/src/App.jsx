import './App.css';
import { useState } from "react";
import Navbar from './components/NavBar';
import Main from './components/Main';
import Choice from './components/Choice';
import ChatBox from './components/ChatBox';
import SubmitField from './components/SubmitField';
import FriendsList from './components/FriendsList';
import UserInfo from './components/UserInfo';
import Friend from './components/Friend';
import UserPage from './components/UserPage';

function App() {

  const [location, setLocation] = useState('main');

  console.log(location);

  const friends = ["bob", "mary", "doug"];

  return (
    <div className="App">
      {/* <Navbar handleSetLocation={setLocation}/>
      {location == 'main' && <Main handleSetLocation={setLocation} />}
      {location == 'choose' && <Choice />}
      <h1>Hello World!</h1>
      <ChatBox/> */}
      <UserPage friends={friends} />
    </div>
  );
}

export default App;