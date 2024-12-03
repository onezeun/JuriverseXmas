'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import StarryBackground from './StarryBackground';
import Lottie from 'lottie-react';
import PoopSanta from '@/lottie/PoopSanta';
import Santa from '@/lottie/Santa';

const opacityVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const ChristmasEnvelope = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isGiftBoxOpen, setIsGiftBoxOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [titleAnimationData, setTitleAnimationData] = useState(null);
  const [isTitleAnimationFinished, setIsTitleAnimationFinished] = useState(false);

  useEffect(() => {
    const fetchAnimation = async () => {
      const response = await fetch('/lottie/title_01.json'); // JSON 파일의 경로
      const data = await response.json();
      setTitleAnimationData(data);
    };

    fetchAnimation();
  }, []);

  // 눈내리는 애니메이션 효과
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

  // Background music setup
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/christmas-music.mp3');
      audioRef.current.loop = true;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.play();
        audioRef.current = null;
      }
    };
  }, []);

  // 편지 클릭
  const handleEnvelopeClick = () => {
    // 열리기 전에 animationComplete 초기화
    if (isOpen) {
      setAnimationComplete(false); // 닫힐 때 초기화
      setTimeout(() => {
        setIsOpen(false); // 열릴 때 딜레이 후 활성화
      }, 300); // 800ms 후 true로 설정
    } else {
      setIsOpen(true);
      setTimeout(() => {
        setAnimationComplete(true); // 열릴 때 딜레이 후 활성화
      }, 800); // 800ms 후 true로 설정
    }
  };

  // 선물상자 클릭 핸들러
  const handleGiftBoxClick = () => {
    setIsGiftBoxOpen(!isGiftBoxOpen);
    setAnimationComplete(false); // 닫힐 때 초기화
    setTimeout(() => {
      setIsOpen(false); // 열릴 때 딜레이 후 활성화
    }, 300); // 800ms 후 true로 설정
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

  const text = '크리스마스';
  const colors = ['text-green-500', 'text-red-500'];

  return (
    <motion.div
      ref={containerRef}
      className="overfolw-x-hidden relative h-[100dvh] w-screen overflow-y-scroll bg-gradient-to-b from-[#141319] via-[#3a3451] to-[#5c498d]"
    >
      <StarryBackground />
      {/* Section 1: Title */}
      <motion.div
        className="absolute"
        initial={{ y: 0, scale: 1 }}
        animate={isTitleAnimationFinished ? { y: '-25vh', scale: 0.5 } : { y: 0, scale: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        <Lottie
          animationData={titleAnimationData}
          loop={false}
          className="soft-glow"
          onComplete={() => setIsTitleAnimationFinished(true)}
        />
      </motion.div>

      {/* Section 2: Envelope */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isTitleAnimationFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="overfolw-x-hidden flex h-[100dvh] flex-col items-center justify-center overflow-x-hidden text-center"
      >
        <motion.div
          initial={{ rotate: -3 }}
          animate={{
            rotate: isOpen ? 0 : -3,
            scale: isOpen ? 1.1 : 1,
            transition: {
              duration: 0.5,
              ease: 'easeInOut',
            },
          }}
          onClick={handleEnvelopeClick}
        >
          <div className="z-50">
            <div
              className={`relative mt-52 flex aspect-[4/3] max-h-[380px] w-[70vw] max-w-[700px] items-center justify-center bg-black transition-all duration-700 ${
                isOpen ? 'cursor-default' : 'cursor-pointer'
              }`}
              onClick={handleEnvelopeClick}
            >
              {/* 편지 내용 */}
              <div
                className={`absolute flex h-[98%] w-[98%] flex-col items-center justify-start bg-white py-5 transition-all duration-300 ${
                  isOpen && animationComplete ? '-translate-y-36 duration-1000' : ''
                }`}
              >
                <p className="mb-5 text-2xl font-semibold text-black">
                  🎄 주리 공주👸의{' '}
                  <span>
                    {text.split('').map((char, index) => (
                      <span key={index} className={colors[index % colors.length]}>
                        {char}
                      </span>
                    ))}
                  </span>
                  파티 🎁
                </p>
                <div className="flex w-full flex-col items-center justify-center">
                  <p className="my-0.5 w-[15.5rem] text-left text-gray-700">
                    <span className="inline-block w-[6.5rem] text-left font-bold">🗓️ 언제?</span>
                    2024년 12월 23일!
                  </p>
                  <p className="my-0.5 w-[15.5rem] text-left text-gray-700">
                    <span className="inline-block w-[6.5rem] text-left font-bold">📍 어디?</span>
                    주리 공주 홈스윗홈 💕
                  </p>
                  <p className="my-0.5 w-[15.5rem] text-left text-gray-700">
                    <span className="inline-block w-[6.5rem] text-left font-bold">⏰ 몇 시?</span>
                    퇴근 후 핫한 밤 😘
                  </p>
                  <p className="my-0.5 w-[15.5rem] text-left text-gray-700">
                    <span className="inline-block w-[6.5rem] text-left font-bold">
                      👗 드레스코드?
                    </span>
                    전라로 오세요~ 🎅 <br />
                    <span className="ml-[6.5rem] text-sm text-neutral-500">
                      (공주님 농담이에요!)
                    </span>
                  </p>
                  <p className="my-0.5 w-[15.5rem] text-left text-gray-700">
                    <span className="inline-block w-[6.5rem] text-left font-bold">🚫 규칙!</span>{' '}
                    연인 동반은 안돼~ 🙅‍♀️
                  </p>
                  <p className="pt-5 font-serif text-gray-700">⭐ Happy Holidays ⭐</p>
                </div>
              </div>
              {!isOpen && (
                <button className="seal z-40 flex aspect-square w-16 items-center justify-center rounded-full border-4 border-rose-900 bg-rose-500 font-serif font-semibold text-red-800 transition-all duration-1000 [clip-path:polygon(50%_0%,_80%_10%,_100%_35%,_100%_70%,_80%_90%,_50%_100%,_20%_90%,_0%_70%,_0%_35%,_20%_10%)]">
                  JURI
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
        </motion.div>
        <div className="flex h-96 flex-col items-center justify-center">
          <div>
            {isGiftBoxOpen ? (
              // 선물상자가 열렸을 때 PoopSanta 컴포넌트 표시
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                onClick={handleGiftBoxClick}
                className={`${isGiftBoxOpen ? 'mt-36' : ''} overfolw-x-hidden`}
              >
                <PoopSanta />
              </motion.div>
            ) : (
              // 선물상자 표시
              <div
                className={`overfolw-x-hidden flex items-end justify-center ${isGiftBoxOpen ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
              >
                <Santa />
                <div className="-ml-5">
                  <motion.div
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{
                      y: [0, -10, 0], // 기본 bounce 애니메이션
                    }}
                    transition={{
                      duration: 0.8, // bounce 애니메이션 속도
                      repeat: Infinity, // 무한 반복
                      repeatType: 'loop',
                    }}
                    whileHover={{
                      y: 0, // 호버 중 바운스 애니메이션 멈춤
                      x: [0, -10, 10, -10, 10, 0], // 좌우 흔들림
                      transition: {
                        duration: 0.5,
                        ease: 'easeInOut',
                      },
                    }}
                    className="relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg bg-white text-2xl shadow-lg"
                    onClick={handleGiftBoxClick}
                  >
                    <div className="absolute left-1/2 top-0 h-full w-2 -translate-x-1/2 transform bg-red-500" />
                    <div className="absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 transform bg-red-500" />
                    <div className="z-50">🎀</div>
                  </motion.div>
                  <p className="mt-1">주리 공주 선물</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Section 3: Final Message */}
      {/* <motion.div
        ref={observer3.ref}
        initial="hidden"
        animate={observer3.animation}
        variants={opacityVariants}
        className="flex h-screen snap-start flex-col items-center justify-center"
      >

      </motion.div> */}

      {/* Background music button */}
      <button
        className="fixed bottom-5 right-5 z-[3] cursor-pointer rounded-full bg-white/20 p-2.5 text-2xl backdrop-blur-md transition-transform duration-300 hover:scale-110"
        onClick={toggleMusic}
      >
        {isMusicPlaying ? '🔇' : '🎵'}
      </button>
    </motion.div>
  );
};

export default ChristmasEnvelope;
