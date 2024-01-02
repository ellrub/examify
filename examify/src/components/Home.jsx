import React from 'react';
import { useNavigate } from 'react-router-dom';

import "../App.css";

function Home() {
  const navigate = useNavigate();

  const navigateOptions = () => {
    navigate('/options');
  };

    return (
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="txt_shadow text-4xl font-bold tracking-wide text-indigo-50 sm:text-6xl">
                Klar for eksamen? <br/>Test deg her!
              </h1>
              <p className="mt-6 text-lg leading-8 text-indigo-50 tracking-wider">
                Test kunnskapen din med tidligere eksamensoppgaver, og se hva du må lese mer på.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  className="cursor-pointer tracking-wide rounded-md bg-violet-500 px-5 py-3 text-xl font-semibold text-indigo-50 shadow-sm hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-900"
                  onClick={navigateOptions}
                >
                  Start her
                </a>
                {/* <a href="#" className="text-base font-semibold leading-6 text-gray-900">
                  Lær mer om Examify <span aria-hidden="true">→</span>
                </a> */}
              </div>
            </div>
          </div>
        </div>
    )
  }

  export default Home;