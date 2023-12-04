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

  })
  const navigate = useNavigate();

  const startExam = (examId) => {
    navigate(`/exam/${examId}`);
  };
  return (
    <>
        <main className='max-w-[75rem] p-[3em]'>
        <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-50 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
            <h1 className='font-semibold text-4xl mb-3 text-center text-gray-800'>Eksamen</h1>
            <div className='cards'>
                <div className='flex flex-wrap gap-10'>
                    <div className='card'>
                        <h2 className='text-lg font-semibold'>For testing</h2>
                        <p className='text-lg'>For testing</p>
                        <ul role='list' className='card__bullets'>
                            <li className='text-red-500 font-bold text-xl leading-8'>TESTING</li>
                            <li className='leading-8'>3 Questions</li>
                        </ul>
                        <a onClick={() => startExam('tester')} href="#" className='cta'>Start</a>
                    </div>
                    <div className='card'>
                        <h2 className='text-lg font-semibold'>Introduksjon til Programmering</h2>
                        <p className='text-lg'>Info132 - Høst 2021</p>
                        <ul role='list' className='card__bullets'>
                            <li className='text-red-500 font-bold text-xl leading-8'>KOMMER</li>
                            <li className='leading-8'>60 Spørsmål</li>
                        </ul>
                        <a onClick={() => startExam('info132h21')} href="#" className='cta'>Start</a>
                    </div>

                    <div className='card'>
                        <h2 className='text-lg font-semibold'>Introduksjon til Programmering</h2>
                        <p className='text-lg'>Info132 - Høst 2020</p>
                        <ul role='list' className='card__bullets'>
                            
                            <li className='leading-8'>60 Spørsmål</li>
                        </ul>
                        <a onClick={() => startExam('info132h20')} href="#" className='cta'>Start</a>
                    </div>

                </div>
                <div className='overlay flex flex-wrap gap-10' />
            </div>
            <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#f980ff] to-[#9089fc] opacity-70 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
        </main>
    </>
  );
}