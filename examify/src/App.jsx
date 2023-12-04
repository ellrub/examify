import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Exam from './components/Exam.jsx';
import Result from './components/Results.jsx';
import Home from "./components/Home.jsx";
import Options from "./components/Options/Options.jsx"

function App() {
  const [userAnswers, setUserAnswers] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/options" element={<Options />} />
        <Route path="/result/:examId" element={<Result userAnswers={userAnswers} />} />
        <Route path="/exam/:examId" element={<Exam setUserAnswers={setUserAnswers} />} />
      </Routes>
    </Router>
  );
}

export default App;