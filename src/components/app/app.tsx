import React, {useEffect} from 'react';
import './app.scss';
import FileInput from '../file-input/file-input';
// import { test } from './test';

function App() {
  // const testFunc = async () => {
  //   await test()
  // }

  return (
    <div className="app-container">
      <FileInput />
      {/* <button onClick={testFunc}>Hey</button> */}
    </div>
  );
}

export default App;
