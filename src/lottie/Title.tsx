import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

const Title = () => {
  const [animationData, setAnimationData] = useState(null);
  const [isTitleAnimationFinished, setIsTitleAnimationFinished] = useState(false);

  useEffect(() => {
    const fetchAnimation = async () => {
      const response = await fetch('/lottie/title_01.json'); // JSON 파일의 경로
      const data = await response.json();
      setAnimationData(data);
    };

    fetchAnimation();
  }, []);

  return (
    <div className="relative h-[100dvh] w-full">
      {/* 로고 */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ y: 0, scale: 1 }}
        animate={isTitleAnimationFinished ? { y: '-40vh', scale: 0.5 } : { y: 0, scale: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        <Lottie
          animationData={animationData}
          loop={false}
          className="soft-glow"
          onComplete={() => setIsTitleAnimationFinished(true)}
        />
      </motion.div>

      {/* 아래 요소 */}
      <motion.div
        className="absolute bottom-0 left-0 w-full"
        initial={{ opacity: 0 }}
        animate={isTitleAnimationFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl text-white">크리스마스 이벤트에 오신 걸 환영합니다!</p>
          <button className="mt-5 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
            참여하기
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Title;
