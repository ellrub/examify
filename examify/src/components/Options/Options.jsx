import "./Options.css"

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

export default function Options() {
  return (
    <>
        <main className='main flow'>
            <h1 className='main__heading'>Eksamen</h1>
            <div className='main__cards cards'>
                <div className='cards__inner'>
                    <div className='cards__card card'>
                        <h2 className='card__heading'>Introduksjon til Informasjonsvitenskap</h2>
                        <p className='card_price'>Info100</p>
                        <ul role='list' className='card__bullets flow'>
                            <li>Hele pensum</li>
                            <li>60 Spørsmål</li>
                        </ul>
                        <a href="#" className='card__cta cta'>Start</a>
                    </div>

                    <div className='cards__card card'>
                        <h2 className='card__heading'>Introduksjon til Programmering</h2>
                        <p className='card_price'>Info132</p>
                        <ul role='list' className='card__bullets flow'>
                            <li>Hele pensum</li>
                            <li>60 Spørsmål</li>
                        </ul>
                        <a href="#" className='card__cta cta'>Start</a>
                    </div>

                </div>
                <div className='overlay cards__inner'></div>
            </div>
        </main>
    </>
  );
}