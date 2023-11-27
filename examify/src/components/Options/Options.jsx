import React from 'react';

import "./Options.css"
import "./options.js"

export default function Options() {
  return (
    <>
        <main className='main flow'>
            <h1 className='main__heading'>Eksamen</h1>
            <div className='main__cards cards'>
                <div className='cards__inner'>
                    <div className='cards__card card'>
                        <h2 className='card__heading'>Basic</h2>
                        <p className='card_price'>$9.99</p>
                        <ul role='list' className='card__bullets flow'>
                            <li>Access to standard workouts and nutrition plans</li>
                            <li>Email support</li>
                        </ul>
                        <a href="#" className='card__cta cta'>Get started</a>
                    </div>

                    <div className='cards__card card'>
                        <h2 className='card__heading'>Pro</h2>
                        <p className='card_price'>$19.99</p>
                        <ul role='list' className='card__bullets flow'>
                            <li>Access to standard workouts and nutrition plans</li>
                            <li>Email support</li>
                        </ul>
                        <a href="#" className='card__cta cta'>Get started</a>
                    </div>

                    <div className='cards__card card'>
                        <h2 className='card__heading'>Ultimate</h2>
                        <p className='card_price'>$29.99</p>
                        <ul role='list' className='card__bullets flow'>
                            <li>Access to standard workouts and nutrition plans</li>
                            <li>Email support</li>
                        </ul>
                        <a href="#" className='card__cta cta'>Get started</a>
                    </div>
                </div>
                <div className='overlay cards__inner'></div>
            </div>
        </main>
    </>
  );
}