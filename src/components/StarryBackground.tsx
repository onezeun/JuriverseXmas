import React, { useEffect, useState } from 'react';

const StarryBackground = () => {
  const [stars, setStars] = useState<{ left: string; top: string; animationDuration: string }[]>(
    []
  );

  useEffect(() => {
    // 별들의 위치와 애니메이션 설정을 생성
    const generateStars = () => {
      return Array.from({ length: 100 }).map(() => ({
        left: `${Math.random() * 100}%`, // 랜덤 X 위치
        top: `${Math.random() * 100}%`, // 랜덤 Y 위치
        animationDuration: `${Math.random() * 3 + 2}s`, // 랜덤 애니메이션 속도
      }));
    };
    setStars(generateStars());
  }, []); // 한 번만 실행

  return (
    <div className="absolute inset-0">
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#FFD700] opacity-50"
          style={{
            width: `${Math.random() * 2}px`, // 랜덤 크기
            height: `${Math.random() * 2}px`,
            left: star.left,
            top: star.top,
            animation: `twinkle ${star.animationDuration} infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default StarryBackground;
