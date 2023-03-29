import React from 'react';
import './app.scss';
import FileInput from '../file-input/file-input';
import MainAnalysis from '../main-analysis/main-analysis';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AnalysisType from '../analysis-type/analysis-type';
import InputFields from '../input-fields/input-fields';
import PreAnalysis from '../pre-analysis/pre-analysis';

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AnalysisType />} />
          <Route path="/prepare-analysis" element={<FileInput />}/> 
          <Route path="/main-analysis" element={<MainAnalysis />} />
          <Route path="/main-analysis-input-fields" element={<InputFields />} />
          <Route path="/pre-analysis" element={<PreAnalysis />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
