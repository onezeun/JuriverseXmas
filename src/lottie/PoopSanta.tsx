import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';

const PoopSanta = () => {
  const [animationData, setAnimationData] = useState(null);
  const lottiePoopSantaRef = useRef<any>(null); // LottieRef로 애니메이션 제어

  useEffect(() => {
    const fetchAnimation = async () => {
      const response = await fetch('/lottie/poopsanta.json'); // JSON 파일의 경로
      const data = await response.json();
      setAnimationData(data);
    };

    fetchAnimation();
  }, []);

  return (
    <div className="flex w-full items-center justify-center">
      {animationData && (
        <Lottie lottieRef={lottiePoopSantaRef} animationData={animationData} loop={false} />
      )}
    </div>
  );
};

export default PoopSanta;
