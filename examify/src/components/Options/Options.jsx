import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import "./Options.css"

export default function Options() {
  useEffect(() => {
    const cardsContainer = document.querySelector(".cards");
    const cards = Array.from(document.querySelectorAll(".card"));
    const overlay = document.querySelector(".overlay");

    const applyOverlayMask = (e) => {
      const overlayEl = e.currentTarget;
      const x = e.pageX - cardsContainer.offsetLeft;
      const y = e.pageY - cardsContainer.offsetTop;

      overlayEl.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
    };

    const createOverlayCta = (overlayCard, ctaEl) => {
      const overlayCta = document.createElement("div");
      overlayCta.classList.add("cta");
      overlayCta.textContent = ctaEl.textContent;
      overlayCta.setAttribute("aria-hidden", true);
      overlayCard.append(overlayCta);
    };

    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const cardIndex = cards.indexOf(entry.target);
        let width = entry.borderBoxSize[0].inlineSize;
        let height = entry.borderBoxSize[0].blockSize;

        if (cardIndex >= 0) {
          overlay.children[cardIndex].style.width = `${width}px`;
          overlay.children[cardIndex].style.height = `${height}px`;
        }
      });
    });

    const initOverlayCard = (cardEl) => {
      const overlayCard = document.createElement("div");
      overlayCard.classList.add("card");
      createOverlayCta(overlayCard, cardEl.lastElementChild);
      overlay.append(overlayCard);
      observer.observe(cardEl);
    };

    cards.forEach(initOverlayCard);
    document.body.addEventListener("pointermove", applyOverlayMask);

    return () => {
      const overlayCards = document.querySelectorAll(".overlay .card");
      overlayCards.forEach(card => card.remove());
    };
  }, []);
  
  const navigate = useNavigate();

  const startExam = (examId) => {
    navigate(`/exam/${examId}`);
  };
  return (
    <main className='max-w-[75rem] p-[3em]'>
      <h1 className='txt_shadow font-semibold text-6xl mb-7 text-center text-indigo-50 tracking-wide'>Eksamen</h1>
      <div className='cards'>
        <div className='flex flex-wrap gap-10'>

          {/* <div className='card'>
              <h2 className='text-lg font-semibold'>For testing</h2>
              <p className='text-lg'>For testing</p>
              <ul role='list' className='card__bullets'>
                  <li className='text-red-500 font-bold text-xl leading-8'>TESTING</li>
                  <li className='leading-8'>3 Questions</li>
              </ul>
              <a onClick={() => startExam('tester')} href="#" className='cta'>Start</a>
          </div> */}

          <div className='card'>
            <h2 className='text-lg font-semibold'>Introduksjon til Programmering</h2>
            <p className='text-lg'>Info132 - Høst 2021</p>
            <ul role='list' className='card__bullets'>  
              <li className='leading-8'>60 Spørsmål</li>
            </ul>
            <a onClick={() => startExam('info132h21')} className='cta'>Start</a>
          </div>

          <div className='card'>
            <h2 className='text-lg font-semibold'>Introduksjon til Programmering</h2>
            <p className='text-lg'>Info132 - Høst 2020</p>
            <ul role='list' className='card__bullets'>
              <li className='leading-8'>60 Spørsmål</li>
            </ul>
            <a onClick={() => startExam('info132h20')} className='cta'>Start</a>
          </div>

        </div>
        <div className='overlay flex flex-wrap gap-10' />
      </div>
    </main>
  );
}