import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Exam, Result, Home, Options } from "./components"

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