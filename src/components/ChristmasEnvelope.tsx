'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import StarryBackground from './StarryBackground';
import Title from '@/lottie/Title';
import useObserver from '@/hooks/useObserver';
import InvitationCard from './InvitationCard';
import Santa from '@/lottie/Santa';
import PoopSanta from '@/lottie/PoopSanta';

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

  // 각각의 섹션에 대해 useObserver 훅을 개별적으로 사용
  const observer1 = useObserver();
  const observer2 = useObserver();
  const observer3 = useObserver();

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
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // 편지 클릭
  const handleEnvelopeClick = () => {
    setIsOpen((prev) => !prev);

    // 열리기 전에 animationComplete 초기화
    if (isOpen) {
      setAnimationComplete(false); // 닫힐 때 초기화
    } else {
      setTimeout(() => {
        setAnimationComplete(true); // 열릴 때 딜레이 후 활성화
      }, 800); // 800ms 후 true로 설정
    }
  };

  // 선물상자 클릭 핸들러
  const handleGiftBoxClick = () => {
    setIsGiftBoxOpen(!isGiftBoxOpen);
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
    <motion.div
      ref={containerRef}
      className="relative h-[100dvh] w-screen overflow-y-scroll bg-gradient-to-b from-[#2C2A4A] via-[#4A4266] to-[#6B5B95]"
    >
      <StarryBackground />
      {/* Section 1: Title */}
      <motion.div
        ref={observer1.ref}
        initial="hidden"
        animate={observer1.animation}
        variants={opacityVariants}
      >
        <Title />
      </motion.div>

      {/* Section 2: Envelope */}
      <motion.div
        ref={observer2.ref}
        initial="hidden"
        animate={observer2.animation}
        variants={opacityVariants}
        className="flex h-screen flex-col items-center justify-center text-center"
      >
        <motion.div
          initial={{ rotate: -3 }}
          animate={{ rotate: isOpen ? 0 : -3 }}
          className="cursor-pointers relative aspect-[4/3] max-h-[400px] w-[80vw] max-w-[540px] rounded-xl border-4 border-[#4e1616] bg-gradient-to-b from-[#F5DEB3] to-[#DEB887] shadow-2xl transition-transform duration-300 hover:scale-105"
          onClick={handleEnvelopeClick}
        >
          {/* 뚜껑 */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={{ rotateX: isOpen ? -180 : 0 }}
            transition={{
              duration: 1,
              ease: 'easeInOut',
            }}
            className="absolute z-[10] h-1/2 w-full origin-top border-b-4 border-[#8B0000] bg-gradient-to-r from-[#C41E3A] to-[#8B0000]"
            style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}
          />
          {/* 내부 콘텐츠 */}
          <div className="relative h-full w-full overflow-hidden">
            {isOpen && animationComplete ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full w-full overflow-y-auto"
              >
                <Santa />
                <InvitationCard isOpen={isOpen} />
              </motion.div>
            ) : null}
          </div>
        </motion.div>
        <p className="relative mt-5 text-lg text-gray-300 opacity-80 drop-shadow-md">
          편지를 클릭해보세요!
        </p>
      </motion.div>

      {/* Section 3: Final Message */}
      <motion.div
        ref={observer3.ref}
        initial="hidden"
        animate={observer3.animation}
        variants={opacityVariants}
        className="flex h-screen snap-start flex-col items-center justify-center"
      >
        <div className="text-center text-white">
          <h1 className="mb-4 text-4xl font-bold">함께 축하해 주세요!</h1>
          <p className="text-lg">
            당신과 함께하는 순간이 <br /> 우리에게 가장 큰 기쁨입니다.
          </p>
          {/* 선물상자와 PoopSanta */}
          <div className="mt-10 flex items-center justify-center">
            {isGiftBoxOpen ? (
              // 선물상자가 열렸을 때 PoopSanta 컴포넌트 표시
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                onClick={handleGiftBoxClick}
              >
                <PoopSanta />
              </motion.div>
            ) : (
              // 선물상자 표시
              <motion.div
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg bg-red-500 shadow-lg"
                onClick={handleGiftBoxClick}
              >
                🎁 {/* 선물상자 이모지 또는 선물상자 컴포넌트 */}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

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
