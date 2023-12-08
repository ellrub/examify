import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useParams } from 'react-router-dom';

import { getExams } from '../../firebase.js';
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
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case '1':
        case '2':
        case '3':
        case '4':
          if (currentExamData) {
            handleAnswer(currentExamData.options[parseInt(event.key) - 1]);
          }
          break;
        case 'Enter':
          if (answers[currentQuestion] !== null) {
            nextQuestion();
          }
          break;
        case 'ArrowRight':
          if (answers[currentQuestion] !== null) {
            nextQuestion();
          }
          break;
        case 'ArrowLeft':
          prevQuestion();
          break;
        default:
          break;
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentQuestion, shuffledExams, answers]);
  
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
              className={`group relative flex items-center p-4 rounded-lg cursor-pointer text-xl border-2 border-indigo-500 ${answers[currentQuestion]?.answer === option ? 'border-2 border-indigo-300 bg-indigo-700' : 'bg-indigo-900 hover:bg-indigo-700'}`}
            >
              <span className="box_shadow hidden dp:flex mr-2 bg-indigo-500 text-indigo-50 rounded w-6 h-6 flex items-center justify-center">{index + 1}</span>
              <p className="ml-2">{option}</p>
              {window.innerWidth > 900 &&
                <p className="opacity-0 dp:opacity-0 group-hover:opacity-100 invisible dp:invisible group-hover:visible absolute right-0 mr-[-180px] top-1/2 transform -translate-y-1/2 bg-indigo-500 text-indigo-50 rounded px-2 py-1 text-sm transition duration-300 ease-in-out">
                  Trykk {index + 1} på tastaturet
                </p>
              }
            </div>
          ))}
        </div>
      </div>
      <div className="space-x-4 mt-5">
        <button 
          onClick={prevQuestion} 
          disabled={currentQuestion === 0} 
          className="group relative cursor-pointer tracking-wider rounded-md bg-violet-500 px-5 py-3 text-xl font-semibold text-indigo-50 shadow-sm hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-900"
        >
          Tilbake
          {window.innerWidth > 900 &&
            <p className="font-normal whitespace-nowrap opacity-0 dp:opacity-0 group-hover:opacity-100 invisible dp:invisible group-hover:visible absolute left-0 ml-[50px] top-20 transform -translate-y-1/2 bg-indigo-500 text-indigo-50 rounded px-2 py-1 text-sm transition duration-300 ease-in-out">
              Trykk venstre pil
            </p>
          }
        </button>
        <button 
          onClick={nextQuestion} 
          disabled={answers[currentQuestion] === null}
          className='group relative cursor-pointer tracking-wider rounded-md bg-violet-500 px-5 py-3 text-xl font-semibold text-indigo-50 shadow-sm hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-900'
        >
          Neste
          {window.innerWidth > 900 &&
            <p className="font-normal whitespace-nowrap opacity-0 dp:opacity-0 group-hover:opacity-100 invisible top-20 dp:invisible group-hover:visible absolute right-0 mr-[25px] transform -translate-y-1/2 bg-indigo-500 text-indigo-50 rounded px-2 py-1 text-sm transition duration-300 ease-in-out">
              Trykk Enter / pil høyre
            </p>
          }
        </button>
      </div>
    </div>
  );
}

export default Exam;