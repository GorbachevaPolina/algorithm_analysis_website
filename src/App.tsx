import React, {useEffect} from 'react';
import './App.css';
import FileInput from './components/file-input/file-input';

function App() {
  const checkConnection = async () => {
    const response = await fetch(
      "https://fancy-fish-purse.cyclic.app"
    )
    const parseRes = await response.json()
    console.log(parseRes)
  }

  useEffect(() => {
    checkConnection()
  }, [])

  return (
    <div className="App">
      <FileInput />
    </div>
  );
}

export default App;
