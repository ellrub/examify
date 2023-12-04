import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getExams } from '../../firebase.js';
import { useParams } from 'react-router-dom';

import "../App.css"

// SyntaxHighligther styling
const customStyle = {
  backgroundColor: '#2b2b2b',
  borderRadius: '0.5em',
  overflowX: 'hidden',
  fontFamily: 'Fira Code, monospace',
  fontSize: '1rem',
};

function Exam({ setUserAnswers }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [exams, setExams] = useState([])
  const navigate = useNavigate();
  const { examId } = useParams();

  const handleAnswer = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = { questionId: exams[currentQuestion].id, answer: option };
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < exams.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setUserAnswers(answers);
      navigate(`/result/${examId}`);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // State to hold the shuffled questions
  const [shuffledExams, setShuffledExams] = useState([]);

  // Fetch exams from Firestore and shuffle the questions when the component mounts
  useEffect(() => {
    getExams(examId).then((fetchedExams) => {
      console.log(fetchedExams);
      setExams(fetchedExams);
      setAnswers(Array(fetchedExams.length).fill(null));
  
      const shuffledExams = [...fetchedExams];
      shuffledExams.forEach(exam => shuffleArray(exam.options));
      setShuffledExams(shuffledExams);
    });
  }, [examId]);

  const currentExamData = shuffledExams[currentQuestion];

  if (!currentExamData) {
    return <div className='loader'></div>
  }

  return (
    <div className="flex flex-col items-center justify-center text-indigo-50 min-h-screen px-4 sm:px-8 md:px-16 text-lg sm:text-xl md:text-2xl">
      <div className="w-full max-w-screen-md mx-auto">
        <p className="text-sm sm:text-base md:text-lg mb-2">Spørsmål {currentQuestion + 1} av {shuffledExams.length}</p>
        <div style={customStyle}>
          <SyntaxHighlighter language="python" wrapLongLines={true} style={darcula}>{currentExamData.question}</SyntaxHighlighter>
        </div>
      </div>
      <div className="flex justify-center mt-4 w-full max-w-screen-md mx-auto">
        <div className="space-y-2 text-left w-full">
          {currentExamData.options.map((option, index) => (
            <div 
              key={index} 
              onClick={() => handleAnswer(option)}
              className={`p-3 rounded-lg cursor-pointer text-xl border border-indigo-500 ${answers[currentQuestion]?.answer === option ? 'bg-indigo-700' : 'bg-indigo-900 hover:bg-indigo-700'}`}
            >
              <p className="ml-2">{option}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex space-x-4 mt-10">
        <button onClick={prevQuestion} disabled={currentQuestion === 0} className="tracking-wider rounded-md bg-violet-500 px-5 py-3 text-xl font-semibold text-indigo-50 shadow-sm hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-900">Tilbake</button>
        <button 
          onClick={nextQuestion} 
          disabled={answers[currentQuestion] === null}
          className='tracking-wider rounded-md bg-violet-500 px-5 py-3 text-xl font-semibold text-indigo-50 shadow-sm hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-900'
        >
          Neste
        </button>
      </div>
    </div>
  );
}

export default Exam;