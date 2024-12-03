'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ChristmasInvitationCardProps {
  isOpen: boolean;
}

const InvitationCard: React.FC<ChristmasInvitationCardProps> = ({ isOpen }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
        y: 50,
      }}
      animate={{
        opacity: isOpen ? 1 : 0,
        scale: isOpen ? 1 : 0.8,
        y: isOpen ? 0 : 50,
      }}
      transition={{
        duration: 0.6,
        type: 'spring',
        stiffness: 150,
        damping: 15,
      }}
      className={`mx-10 my-10 rounded-xl bg-gradient-to-br from-[#F7F1E3] to-[#FFF1DA] p-5 text-center leading-relaxed shadow-lg ${
        !isOpen ? 'pointer-events-none' : ''
      }`}
    >
      <h1
        className="mb-5 text-2xl font-extrabold text-white drop-shadow-[0_4px_3px_rgba(50,100,250,0.3)]"
        style={{
          textShadow: '0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,0,0,0.5)',
        }}
      >
        🎄 주리 공주의 크리스마스 파티 🎁
      </h1>
      <div className="relative space-y-3 text-lg text-gray-800">
        <p className="text-green-700">
          🗓️ <b>언제?</b> 2024년 12월 23일!
        </p>
        <p className="text-red-700">
          📍 <b>어디?</b> 따뜻~한 주리 공주의 홈스윗홈 💕
        </p>
        <p className="text-blue-700">
          ⏰ <b>몇 시?</b> 다들 퇴근 후에 오시면 딱 좋아요 😘
        </p>
        <p className="text-purple-700">
          👗 <b>드레스코드는?</b> 전라로 오세요~ 🎅 <br /> (공주님 농담이에요!)
        </p>
        <p className="text-orange-700">
          🚫 <b>규칙!</b> 연인 동반은 안돼~! 🙅‍♀️
        </p>
        <p className="text-xl font-bold text-yellow-600">⭐ Happy Holidays ⭐</p>
      </div>
    </motion.div>
  );
};

export default InvitationCard;
