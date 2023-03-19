import React, {useEffect} from 'react';
import './App.css';
import FileInput from './components/file-input/file-input';
import { test } from './test';

function App() {
  // const testFunc = async () => {
  //   await test()
  // }

  return (
    <div className="App">
      <FileInput />
      {/* <button onClick={testFunc}>Hey</button> */}
    </div>
  );
}

export default App;
