import React, {useEffect} from 'react';
import './app.scss';
import FileInput from '../file-input/file-input';
// import { test } from './test';
import { useSelector } from 'react-redux';
import MainAnalysis from '../main-analysis/main-analysis';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  // const testFunc = async () => {
  //   await test()
  // }
  const { analysisStarted } = useSelector((store) => store.calculationsFile)

  return (
    <div className="app-container">
      {/* <button onClick={testFunc}>Hey</button> */}
      {/* {
        analysisStarted ?
        <MainAnalysis /> : <FileInput />
      } */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FileInput />}/> 
          <Route path="/main-analysis" element={<MainAnalysis />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
