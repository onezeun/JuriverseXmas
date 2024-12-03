import React, { useState } from 'react';

const Card = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCardClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="z-50">
      <div
        className={`relative flex aspect-video w-[300px] items-center justify-center bg-black transition-all duration-700 sm:w-[350px] ${
          isOpen ? 'cursor-default' : 'cursor-pointer'
        }`}
        onClick={handleCardClick}
      >
        <div
          className={`absolute flex h-full w-full flex-col items-center justify-start bg-white py-5 transition-all duration-300 ${
            isOpen ? '-translate-y-16 duration-1000' : ''
          }`}
        >
          <p className="font-serif text-xl font-semibold text-gray-500 sm:text-2xl">Thank You</p>
          <p className="px-10 text-[10px] text-gray-700 sm:text-[12px]">
            It’s so nice that you had the time to view this idea
          </p>
          <p className="font-serif text-[10px] text-gray-700 sm:text-[12px]">
            Wishing you a fantastic day ahead!
          </p>
          <p className="pt-5 font-sans text-[10px] text-gray-700">SMOOKYDEV</p>
        </div>
        {!isOpen && (
          <button className="seal z-40 flex aspect-square w-10 items-center justify-center rounded-full border-4 border-rose-900 bg-rose-500 text-[10px] font-semibold text-red-800 transition-all duration-1000 [clip-path:polygon(50%_0%,_80%_10%,_100%_35%,_100%_70%,_80%_90%,_50%_100%,_20%_90%,_0%_70%,_0%_35%,_20%_10%)]">
            SMKY
          </button>
        )}
        <div
          className={`tp absolute h-full w-full bg-neutral-800 transition-all duration-1000 ${
            isOpen
              ? '[clip-path:polygon(50%_0%,_100%_0,_0_0)]'
              : '[clip-path:polygon(50%_50%,_100%_0,_0_0)]'
          }`}
        />
        <div className="lft absolute h-full w-full bg-neutral-900 transition-all duration-700 [clip-path:polygon(50%_50%,_0_0,_0_100%)]" />
        <div className="rgt absolute h-full w-full bg-neutral-800 transition-all duration-700 [clip-path:polygon(50%_50%,_100%_0,_100%_100%)]" />
        <div className="btm absolute h-full w-full bg-neutral-900 transition-all duration-700 [clip-path:polygon(50%_50%,_100%_100%,_0_100%)]" />
      </div>
    </div>
  );
};

export default Card;
