import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.js'; // replace with the path to your Firebase config

function Result({ userAnswers }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, 'info132h20'));
      setQuestions(querySnapshot.docs.map(doc => doc.data()));
      setLoading(false);
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const score = userAnswers.filter((answer, index) => answer === questions[index].answer).length;

  return (
    <div className="flex flex-col items-center text-black">
      <h1 className="text-2xl font-bold mt-10 mb-4">Antall rette: {score}/{questions.length}</h1>
      {questions.map((question, index) => (
        <div key={index} className="mb-8 p-4 bg-white shadow-md rounded-lg w-full md:w-1/2">
          <p className="text-lg mb-2">{question.question}</p>
          <p className="mb-2"><span className="font-bold">Ditt svar:</span> {userAnswers[index]}</p>
          {userAnswers[index] !== question.answer && (
            <p className="mb-2"><span className="font-bold">Rett svar:</span> {question.answer}</p>
          )}
          <p className={`font-bold ${userAnswers[index] === question.answer ? 'text-green-500' : 'text-red-500'}`}>
            {userAnswers[index] === question.answer ? 'Riktig' : 'Feil'}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Result;