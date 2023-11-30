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
        <Route path="/result" element={<Result userAnswers={userAnswers} />} />
        <Route path="/exam" element={<Exam setUserAnswers={setUserAnswers} />} />
      </Routes>
    </Router>
  );
}

export default App;

// import { createBrowserRouter, RouterProvider } from "react-router-dom"

// import Main from './components/Main.jsx'
// import Quiz from "./components/Quiz.jsx"
// import Result from "./components/Result.jsx"
// import Options from "./components/Options/Options.jsx"
// import './App.css'

// // routes
// const router = createBrowserRouter([
//   {
//     path : "/",
//     element : <Main></Main>
//   },
//   {
//     path : "/options",
//     element : <Options></Options>
//   },
//   {
//     path : "/quiz",
//     element : <Quiz></Quiz>
//   },
//   {
//     path : "/result",
//     element : <Result></Result>
//   },
// ])

// function App() {
//   return (
//     <>
//       <RouterProvider router={router}/>
//     </>
//   )
// }


// export default App
