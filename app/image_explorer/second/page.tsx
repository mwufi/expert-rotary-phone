'use client'

import React from 'react';
import PanZoomWindow from './PanZoomWindow';

const SecondPage = () => {
  const handleButtonClick = () => {
    console.log('Button clicked!');
  };

  return (
    <PanZoomWindow>
      <div className="flex items-center justify-center h-full w-full">
        <button
          onClick={handleButtonClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Click me!
        </button>
      </div>
    </PanZoomWindow>
  );
};

export default SecondPage;
