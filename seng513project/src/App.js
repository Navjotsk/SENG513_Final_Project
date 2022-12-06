import './App.css';
import { useState } from "react";
import Navbar from './components/NavBar';
import Main from './components/Main';

function App() {

  const [location, setLocation] = useState('main');

  return (
    <div className="App">
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
