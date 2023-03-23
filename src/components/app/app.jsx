import React, {useEffect} from 'react';
import './app.scss';
import FileInput from '../file-input/file-input';
// import { test } from './test';
import { useSelector } from 'react-redux';
import MainAnalysis from '../main-analysis/main-analysis';

function App() {
  // const testFunc = async () => {
  //   await test()
  // }
  const { analysisStarted } = useSelector((store) => store.calculationsFile)

  return (
    <div className="app-container">
      {/* <button onClick={testFunc}>Hey</button> */}
      {
        analysisStarted ?
        <MainAnalysis /> : <FileInput />
      }
    </div>
  );
}

export default App;
