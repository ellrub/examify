import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from "react-markdown";
import { getExams } from '../../firebase.js';
import { useParams } from 'react-router-dom';

import "../App.css"

function Exam({ setUserAnswers }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [exams, setExams] = useState([])
  const navigate = useNavigate();
  const { examId } = useParams();

  const handleAnswer = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = option;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < exams.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setUserAnswers(answers);
      navigate('/result');
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
    <div className="flex flex-col items-center justify-center text-black min-h-screen px-4 sm:px-8 md:px-16 text-lg sm:text-xl md:text-2xl">
      <div className="w-full max-w-screen-md mx-auto">
        <p className="text-sm sm:text-base md:text-lg mb-2">Spørsmål {currentQuestion + 1} av {shuffledExams.length}</p>
        <ReactMarkdown className="font-bold mb-4">{currentExamData.question}</ReactMarkdown>
      </div>
      <div className="flex justify-center mt-4">
        <div className="space-y-2 text-left">
          {currentExamData.options.map((option, index) => (
            <label key={index} className="flex items-center">
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                value={option}
                checked={answers[currentQuestion] === option}
                onChange={() => handleAnswer(option)}
                className="mr-2"
              />
              <ReactMarkdown className="ml-2">{option}</ReactMarkdown>
            </label>
          ))}
        </div>
      </div>
      <div className="flex space-x-4 mt-10">
        <button onClick={prevQuestion} disabled={currentQuestion === 0} className="py-2 px-4 rounded-lg bg-gray-500 text-white text-lg">Tilbake</button>
        <button 
          onClick={nextQuestion} 
          disabled={answers[currentQuestion] === null}
          className='py-2 px-4 rounded-lg bg-blue-500 text-white text-lg'
        >
          Neste
        </button>
      </div>
    </div>
  );
}

export default Exam;