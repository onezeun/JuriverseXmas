'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import gsap from 'gsap';
import StarryBackground from './StarryBackground';
import Title from '@/components/Title';

const ChristmasEnvelope = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const envelopeRef = useRef(null);
  const flapRef = useRef(null);
  const letterRef = useRef(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const createSnowflake = useCallback(() => {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.style.left = `${Math.random() * 100}%`;
    snowflake.style.opacity = Math.random().toString();
    snowflake.style.animation = `fall ${Math.random() * 3 + 2}s linear infinite`;
    return snowflake;
  }, []);

  useEffect(() => {
    const snowContainer = document.createElement('div');
    snowContainer.classList.add('snow-container');
    document.body.appendChild(snowContainer);

    const addSnowflake = () => {
      const snowflake = createSnowflake();
      snowContainer.appendChild(snowflake);
      setTimeout(() => snowflake.remove(), 5000);
    };

    const snowInterval = setInterval(addSnowflake, 100);

    return () => {
      clearInterval(snowInterval);
      snowContainer.remove();
    };
  }, [createSnowflake]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/christmas-music.mp3');
      audioRef.current.loop = true;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleEnvelopeClick = () => {
    if (!isOpen) {
      gsap.to(flapRef.current, {
        duration: 1,
        rotateX: 180,
        ease: 'power2.out',
      });

      gsap.to(letterRef.current, {
        duration: 1.2,
        delay: 0.5,
        y: '-50%',
        opacity: 1,
        ease: 'elastic.out(1, 0.5)',
      });
    } else {
      gsap.to(letterRef.current, {
        duration: 0.5,
        y: '-100%',
        opacity: 0,
        ease: 'power2.in',
      });

      gsap.to(flapRef.current, {
        duration: 1,
        rotateX: 0,
        delay: 0.5,
        ease: 'power2.inOut',
      });
    }
    setIsOpen(!isOpen);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-gradient-to-b from-[#2C2A4A] via-[#4A4266] to-[#6B5B95]">
      {/* <Title /> */}
      {/* Starry Night Background Effect */}
      <StarryBackground />
      <div className="relative z-[2] flex min-h-[100dvh] flex-col items-center justify-center text-center">
        <div
          ref={envelopeRef}
          className={`${isOpen ? '-rotate-0' : '-rotate-3'} relative h-[50vh] w-[80vw] cursor-pointer overflow-hidden rounded-xl border-4 border-[#4e1616] bg-gradient-to-b from-[#F5DEB3] to-[#DEB887] shadow-2xl transition-transform duration-300 hover:scale-105`}
          onClick={handleEnvelopeClick}
        >
          <div
            ref={flapRef}
            className="absolute z-[2] h-1/2 w-full origin-top border-b-4 border-[#8B0000] bg-gradient-to-r from-[#C41E3A] to-[#8B0000] before:absolute before:left-1/2 before:top-[30%] before:-translate-x-1/2 before:-translate-y-1/2 before:transform before:text-2xl before:shadow-2xl before:content-['❄️']"
            style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}
          />
          <div className="relative h-full w-full bg-transparent">
            <div
              ref={letterRef}
              className={`border-3 absolute left-1/2 top-[50%] z-[1] w-[85%] -translate-x-1/2 -translate-y-full rounded-xl border-dashed border-[#C41E3A] bg-white p-5 text-center leading-relaxed text-gray-100 opacity-0 shadow-2xl`}
            >
              <p
                className="my-2.5 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 bg-clip-text text-2xl font-extrabold text-white drop-shadow-lg"
                style={{
                  textShadow: '0 0 5px rgba(255, 0, 0, 0.9), 0 0 20px rgba(255, 228, 0, 0.7)',
                }}
              >
                🎄 주리 공주의 크리스마스 파티 초대장 🎁
              </p>
              <p className="my-2.5 text-xl font-bold text-green-300">
                🗓️ <b>언제?</b> 2024년 12월 23일!
              </p>
              <p className="my-2.5 text-xl font-bold text-red-300">
                📍 <b>어디?</b> 따뜻~한 주리 공주의 홈스윗홈 💕
              </p>
              <p className="my-2.5 text-xl font-bold text-blue-300">
                ⏰ <b>몇 시?</b> 다들 퇴근 후에 오시면 딱 좋아요 😘
              </p>
              <p className="my-2.5 text-xl font-bold text-purple-300">
                👗 <b>드레스코드는?</b> 전라로 오세요~ 꺄아 {`><`} (공주님 농담이에요~)
              </p>
              <p className="my-2.5 text-xl font-bold text-orange-300">
                🚫 <b>규칙!</b> 연인 동반은 안돼요~! 🙅‍♀️
              </p>
              <p className="my-2.5 text-2xl font-bold text-yellow-300">⭐ Happy Holidays ⭐</p>
              <span className="absolute left-5 top-5 z-50 animate-float text-2xl">❄️</span>
              <span className="absolute bottom-5 right-5 z-50 animate-float text-2xl">🎁</span>
            </div>
          </div>
        </div>
        <p className="relative mt-5 text-lg text-gray-300 opacity-80 drop-shadow-md">
          편지를 클릭해보세요!
        </p>
        <button
          className="fixed bottom-5 right-5 z-[3] cursor-pointer rounded-full bg-white/20 p-2.5 text-2xl backdrop-blur-md transition-transform duration-300 hover:scale-110"
          onClick={toggleMusic}
        >
          {isMusicPlaying ? '🔇' : '🎵'}
        </button>
      </div>
    </div>
  );
};

export default ChristmasEnvelope;
