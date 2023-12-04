import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getExams } from '../../firebase.js';
import "../App.css"

function Result({ userAnswers }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { examId } = useParams();
  console.log("examId:", examId);

  useEffect(() => {
    const fetchExams = async () => {
      console.log("Fetching exams with examId:", examId)
      const fetchedQuestions = await getExams(examId);
      console.log("fetchedQuestions:", fetchedQuestions)
      setQuestions(fetchedQuestions);
      setLoading(false);
    };

    fetchExams();
  }, [examId]);

  if (loading) {
    return <div className='loader'></div>
  }

  // Sort userAnswers and questions by question ID
  const sortedUserAnswers = [...userAnswers].sort((a, b) => a.questionId - b.questionId);
  const sortedQuestions = [...questions].sort((a, b) => a.id - b.id);

  // Calculate score
  // Calculate score
  const score = sortedUserAnswers.filter((answer, index) => {
    console.log("User's answer:", answer.answer);
    console.log("Correct answer:", sortedQuestions[index].answer);
    return answer.answer === sortedQuestions[index].answer;
  }).length;

  return (
    <div className="flex flex-col items-center text-black">
      <h1 className="text-2xl font-bold mt-10 mb-4">Antall rette: {score}/{questions.length}</h1>
      {sortedQuestions.map((question, index) => (
        <div key={index} className="mb-8 p-4 bg-white shadow-md rounded-lg w-full md:w-1/2">
          <p className="text-lg mb-2">{question.question}</p>
          <p className="mb-2"><span className="font-bold">Ditt svar:</span> {sortedUserAnswers[index].answer}</p>
          {sortedUserAnswers[index].answer !== question.answer && (
            <p className="mb-2"><span className="font-bold">Rett svar:</span> {question.answer}</p>
          )}
          <p className={`font-bold ${sortedUserAnswers[index].answer === question.answer ? 'text-green-500' : 'text-red-500'}`}>
            {sortedUserAnswers[index].answer === question.answer ? 'Riktig' : 'Feil'}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Result;