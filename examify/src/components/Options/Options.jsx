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

  const startExam = () => {
    navigate('/exam');
  };
  return (
    <>
        <main className='main flow'>
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
            <h1 className='main__heading'>Eksamen</h1>
            <div className='main__cards cards'>
                <div className='cards__inner'>
                    {/* <div className='cards__card card'>
                        <h2 className='card__heading'>Introduksjon til Informasjonsvitenskap</h2>
                        <p className='card_price'>Info100</p>
                        <ul role='list' className='card__bullets flow'>
                            <li>Hele pensum</li>
                            <li>60 Spørsmål</li>
                        </ul>
                        <a href="#" className='card__cta cta'>Start</a>
                    </div> */}

                    <div className='cards__card card'>
                        <h2 className='card__heading'>Introduksjon til Programmering</h2>
                        <p className='card_price'>Info132</p>
                        <ul role='list' className='card__bullets flow'>
                            <li>Hele pensum</li>
                            <li>56 Spørsmål</li>
                        </ul>
                        <a onClick={startExam} href="#" className='card__cta cta'>Start</a>
                    </div>

                </div>
                <div className='overlay cards__inner'></div>
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